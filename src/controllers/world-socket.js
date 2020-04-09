const UserDAO = require('../dao/UserDAO');
const WorldMap = require('../models/WorldMap');
const WorldCharacter = require('../models/WorldCharacter');
let world;

let maps = [];

module.exports.fillSocket = function(io){
    world = io.of('/world');

    world.on('connection', (socket) => {
        socket.on('enterMap', async (user_id) => {
            const mapID = await enterMap(user_id, socket); 
            console.log(`Alguém entrou no mapa ${mapID}`);
            socket.emit('enterMap', {mapID, map: maps[mapID]});
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} desconectou`);
            removeFromMap(socket.id);
        });

        socket.on('moveChar', (data) => {
            const dir = data.dir;
            const moved = moveChar(dir, socket);
            if(moved){
                socket.emit('moveChar', {id: socket.id, dir});
            }
        })
    });    

    return io;
}

function moveChar(dir, socket){
    const socketID = socket.id;

    for(let i in maps){
        const map = maps[i];
        for(let j in map.players){            
            if(j === socketID){
                const char = map.players[j];
                return char.move(dir, map.layout);
            }
        }
    }

    return false;
}

async function enterMap(user_id, socket){
    const game_user = await UserDAO.getGamingUser(user_id);
    socket.join(game_user.map);
    
    // maps[game_user.map].players[socket.id] = game_user;
    maps[game_user.map].players[socket.id] = WorldCharacter.create(game_user);

    return game_user.map;
}

async function removeFromMap(socketID){
    for(let i in maps){
        const map = maps[i];
        for(let j in map.players){
            if(j === socketID){
                delete map.players[j];
            }
        }
    }
}


(() => {
    initializeMaps();
})();

function initializeMaps(){
    for(let i = 0; i < 1; i++){
        maps[i] = {
            players: {},
            layout: WorldMap.loadMapLayout[i]()
        }
    }
}