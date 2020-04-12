let pressedKeys = {};
let observers = [];

function setKey(e, status) {    
    const key = e.key.toUpperCase();

    pressedKeys[key] = status;
}

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
       e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' '){
        e.preventDefault();
    }
    setKey(e, true);

    notifyAll(e.key);
});

document.addEventListener('keyup', function(e) {
    setKey(e, false);
});

window.addEventListener('blur', function() {
    pressedKeys = {};
});

function isPressed(key){
    return pressedKeys[key.toUpperCase()];
}

function notifyAll(event){
	observers.forEach(function(observer){
		observer(event);
	});
}

function subscribe(observer){
	observers.push(observer);
}

export {subscribe, isPressed};


