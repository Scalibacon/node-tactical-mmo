/***
 -OneShotKeys armazenam as keys que só serão disparadas uma vez por período.
 -Seu valor aumenta conforme a tecla é pressionada, mas só é válida se for 1.
 -Se for válida, dá o notify; depois de certo tempo pressionada, reseta pra 0.
 ***/

let pressedKeys = {};
let observers = [];
let oneShotKeys = {};

function setKey(e, status) {    
    const key = e.key.toUpperCase();    

    pressedKeys[key] = status;
}

function start(){
    pressedKeys = {};
    observers = [];
    oneShotKeys = {};

    setEvents();
}

function setEvents(){
    document.addEventListener('keydown', function(e) {
        let key = e.key;
        if(key === 'ArrowUp' || key === 'ArrowDown' || 
           key === 'ArrowLeft' || key === 'ArrowRight' || key === ' '){
            e.preventDefault();
        }
        setKey(e, true);
    
        key = key.toUpperCase();
        if(isNaN(oneShotKeys[key])){
            oneShotKeys[key] = 0;
        }
        oneShotKeys[key] += 1;
        
        if(oneShotKeys[key] >= 10){
            oneShotKeys[key] = 0;
        }
    
        if(isOneShot(key)){
            notifyAll(key);
        }
    });
    
    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    
        const key = e.key.toUpperCase();
        oneShotKeys[key] = 0;
    });
    
    window.addEventListener('blur', function() {
        pressedKeys = {};
        oneShotKeys = {};
    });
}

function isPressed(key){
    return pressedKeys[key.toUpperCase()];
}

function isOneShot(key){
    key = key.toUpperCase();
    return oneShotKeys[key] === 1;
}

function notifyAll(event){
	observers.forEach(function(observer){
		observer(event);
	});
}

function subscribe(observer){
	observers.push(observer);
}

function popObserver(){
    observers.pop()
}

export { subscribe, isPressed, popObserver, isOneShot, start };