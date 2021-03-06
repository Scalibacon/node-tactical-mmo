const socket = io('/world');
const observers = [];

export function connectToWorld(){    

    socket.on('connect', () => {
        enterMap();
    });

    socket.on('enterMap', (data) => {
        const event = {type: 'enterMap', data};
        notifyAll(event)
    });

    socket.on('addPlayerToMap', (data) => {
        const event = {type: 'addPlayerToMap', data};
        notifyAll(event);
    });

    socket.on('removePlayerFromMap', (data) => {
        const event = {type: 'removePlayerFromMap', data};
        notifyAll(event);
    });

    socket.on('moveChar', data => {
        const event = {type: 'moveChar', data};
        notifyAll(event);
    });

    socket.on('turnChar', data => {
        const event = {type: 'turnChar', data};
        notifyAll(event);
    });

    socket.on('startTalk', (data) => {
        const event = {type: 'startTalk', data};
        notifyAll(event)
    });

    socket.on('getActiveAllies', data => {
        const event = {type: 'getActiveAllies', data};
        notifyAll(event)
    });

    socket.on('showMessage', data => {
        const event = {type: 'showMessage', data};
        notifyAll(event)
    });
}

function enterMap(){
    const id = localStorage.getItem('id');
    socket.emit('enterMap', id);
}

/************************ OBSERVER ************************/
function notifyAll(event){
	observers.forEach(function(observer){
		observer(event);
	});
}

function subscribe(observer){
	observers.push(observer);
}

export {subscribe, socket};