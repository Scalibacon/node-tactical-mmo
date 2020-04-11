const UserDAO = require('../dao/UserDAO');
const WorldMap = require('./WorldMap');
const WorldCharacter = require('./WorldCharacter');
const { loadNpcs } = require('./WorldNpcs');
let world;

let maps = [];

module.exports.fillSocket = function(io){
    world = io.of('/world');

    world.on('connection', (socket) => {
        socket.on('enterMap', async (user_id) => {
            const player = await enterMap(user_id, socket); 
            const mapID = player.map;
            console.log(`Alguém entrou no mapa ${mapID}`);
            socket.emit('enterMap', {mapID, map: maps[mapID]});

            socket.to(mapID).emit('addPlayerToMap', {player, socketID: socket.id});
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} desconectou`);
            const mapID = getCharMap(socket.id);
            removeFromMap(mapID, socket.id);
            socket.to(mapID).emit('removePlayerFromMap', {socketID: socket.id});            
        });

        socket.on('moveChar', (data) => {
            const dir = data.dir;
            const res = moveChar(dir, socket);
            if(res.moved){
                world.emit('moveChar', {id: socket.id, dir});
            } else if(res.turned){
                world.emit('turnChar', {id: socket.id, dir});
            }
        });

        socket.on('interact', (data) => {
            interact(socket);
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

function moveChar(dir, socket){
    const socketID = socket.id;

    const mapID = getCharMap(socketID);
    if(!mapID){
        return false;
    }

    const char = maps[mapID].players[socketID]
    return char.move(dir, maps[mapID]);
}

async function enterMap(user_id, socket){
    const game_user = await UserDAO.getGamingUser(user_id);
    socket.join(game_user.map);
    
    // maps[game_user.map].players[socket.id] = game_user;
    maps[game_user.map].players[socket.id] = WorldCharacter.create(game_user);

    return maps[game_user.map].players[socket.id];
}

async function removeFromMap(mapID, socketID){
    delete maps[mapID].players[socketID];
}

function interact(socket){
    const mapID = getCharMap(socket.id);
    const char = maps[mapID].players[socket.id];

    const result = char.interact(maps[mapID]);
    if(result)
        socket.emit('startTalk', result);
}


(() => {
    initializeMaps();
})();

function initializeMaps(){
    for(let i = 0; i < 1; i++){
        maps[i] = {
            players: {},
            npcs: loadNpcs(i),
            layout: WorldMap.loadMapLayout[i]()
        }
    }
}