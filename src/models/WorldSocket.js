const UserDAO = require('../dao/UserDAO');
const { loadMapLayout, loadMapPortals, getOtherPortal } = require('./WorldMap');
const CharacterDAO = require('../dao/CharacterDAO');
const WorldCharacter = require('./WorldCharacter');
const { loadNpcs, processCharDialog } = require('./WorldNpcs');
let world;

let maps = [];

module.exports.fillSocket = function(io){
    world = io.of('/world');

    world.on('connection', (socket) => {
        socket.on('enterMap', async (userID) => {
            enterMap(userID, socket);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} desconectou`);
            removeFromMap(socket);                       
        });

        socket.on('moveChar', (data) => {            
            const dir = data.dir;
            const res = moveChar(dir, socket);
            if(res.moved){
                world.emit('moveChar', {id: socket.id, dir});
                checkMapChange(socket);
            } else if(res.turned){
                world.emit('turnChar', {id: socket.id, dir});
            }
        });

        socket.on('interact', (data) => {
            interact(socket);
        });

        socket.on('finishDialog', async (data) => {
            const char = getChar(socket.id);
            const resp = await processCharDialog(char, data.npcID, data.progress, data.resp);
            if(resp){
                socket.emit('showMessage', {message: resp});
            }
        });

        socket.on('getActiveAllies', async (data) => {
            const char = getChar(socket.id);
            const allies = await CharacterDAO.getUserCharacters(char.user_id);
            socket.emit('getActiveAllies', {allies});
        });
    });    

    return io;
}

function getCharMap(socketID){
    for(let i in maps){
        const map = maps[i];
        for(let j in map.players){            
            if(j === socketID){
                return i;
            }
        }
    }
    return false;
}

function getChar(socketID){
    const mapID = getCharMap(socketID);
    return maps[mapID].players[socketID];
}

function moveChar(dir, socket){
    const socketID = socket.id;

    const mapID = getCharMap(socketID);
    if(!mapID){
        return false;
    }

    const char = maps[mapID].players[socketID]
    const res = char.move(dir, maps[mapID]);
    if(res.moved){
        UserDAO.updatePosition(char.user_id, mapID, char.x, char.y);
    }

    return res;
}

async function enterMap(user_id, socket){
    const game_user = await UserDAO.getGamingUser(user_id);
    socket.join(game_user.map);
    
    const player = WorldCharacter.create(game_user);
    const mapID = player.map;   

    maps[game_user.map].players[socket.id] = player; 
    
    console.log(`Alguém entrou no mapa ${mapID}`);
    socket.emit('enterMap', {mapID, map: maps[mapID]});

    socket.to(mapID).emit('addPlayerToMap', {player, socketID: socket.id});
}

async function removeFromMap(socket){
    const mapID = getCharMap(socket.id);
    if(maps[mapID].players[socket.id]){
        delete maps[mapID].players[socket.id];
        socket.leave(mapID);
        socket.to(mapID).emit('removePlayerFromMap', {socketID: socket.id}); 
    }
}

function interact(socket){
    const mapID = getCharMap(socket.id);
    const char = maps[mapID].players[socket.id];

    const result = char.interact(maps[mapID]);
    if(result){
        socket.emit(`start${result.type}`, {dialog: result.dialog, npc: result.npc, progress: result.progress});
    }
}

function checkMapChange(socket){
    const mapID = getCharMap(socket.id);
    const char = maps[mapID].players[socket.id];

    for(let i in maps[mapID].portals){
        const portal = maps[mapID].portals[i]
        if(portal.x == char.x && portal.y == char.y){
            const other_portal = getOtherPortal(portal);
            changeMap(socket, other_portal);
        }
    }
}

function changeMap(socket, new_map){
    const mapID = getCharMap(socket.id);
    const char = maps[mapID].players[socket.id];
    setTimeout(async () => {
        // console.log(`${char.username} mudou de mapa`);
        await UserDAO.updatePosition(char.user_id, new_map.map, new_map.x, new_map.y);
        removeFromMap(socket);
        enterMap(char.user_id, socket, new_map);
    }, 250);
}


(() => {
    initializeMaps();
})();

function initializeMaps(){
    for(let i = 0; i < 2; i++){
        maps[i] = {
            players: {},
            npcs: loadNpcs(i),
            layout: loadMapLayout(i),
            portals: loadMapPortals(i)
        }
    }
}