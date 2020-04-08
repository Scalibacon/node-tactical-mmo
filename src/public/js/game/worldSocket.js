const socket = io('/world');

export function connectToWorld(){    

    socket.on('connect', () => {
        enterMap();
    });
}

function enterMap(){
    const id = sessionStorage.getItem('id');
    socket.emit('enterMap', id);
}