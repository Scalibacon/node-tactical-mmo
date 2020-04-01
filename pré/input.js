let pressedKeys = {};

function setKey(event, status) {
    const code = event.code;

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

/* depois dar um export */
window.input = {
    isDown: function(key) {
        return pressedKeys[key.toUpperCase()];
    }
};
