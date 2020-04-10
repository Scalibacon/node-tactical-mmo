let pressedKeys = {};

function setKey(e, status) {    
    const key = e.key.toUpperCase();

    pressedKeys[key] = status;
}

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
       e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
        e.preventDefault();
    }
    setKey(e, true);
});

document.addEventListener('keyup', function(e) {    
    setKey(e, false);
});

window.addEventListener('blur', function() {
    pressedKeys = {};
});

export function isPressed(key){
    return pressedKeys[key.toUpperCase()];
}
