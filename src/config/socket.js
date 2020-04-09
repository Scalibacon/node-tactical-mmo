const worldSocket = require('../controllers/world-socket');

module.exports.getSocket = function(server){
    let io = require('socket.io').listen(server);

    io = worldSocket.fillSocket(io);

    return io;
}