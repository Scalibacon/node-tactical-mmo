const UserDAO = require('../dao/UserDAO');
let world;

let maps = [];

module.exports.fillSocket = function(io){
    world = io.of('/world');

    world.on('connection', (socket) => {
        console.log('Alguém entrou no mundo');

        socket.on('enterMap', (user_id) => {
            enterMap(user_id, socket);            
        });
    });    

    return io;
}

async function enterMap(user_id, socket){
    const game_user = await UserDAO.getGamingUser(user_id);
    socket.join(game_user.map);
    
    maps[game_user.map].players[socket.id] = game_user;
}


(() => {
    initializeMaps();
})();

function initializeMaps(){
    for(let i = 0; i < 10; i++){
        maps[i] = {
            players: {}
        }
    }
}