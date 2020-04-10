const worldSocket = require('../models/WorldSocket');

module.exports.getSocket = function(server){
    let io = require('socket.io').listen(server);

    io = worldSocket.fillSocket(io);

    return io;
}