let pressedKeys = {};

function setKey(event, status) {
    const code = event.code.toUpperCase();

    pressedKeys[code] = status;
}

document.addEventListener('keydown', function(e) {
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
