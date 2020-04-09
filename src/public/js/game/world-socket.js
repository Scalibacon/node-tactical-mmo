const socket = io('/world');
const observers = [];

export function connectToWorld(){    

    socket.on('connect', () => {
        enterMap();
    });

    socket.on('enterMap', (data) => {
        const event = {type: 'enterMap', data};
        notifyAll(event)
    })

    socket.on('moveChar', data => {
        const event = {type: 'moveChar', data};
        notifyAll(event);
    })
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