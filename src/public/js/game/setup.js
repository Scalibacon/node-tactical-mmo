import { connectToWorld } from './worldSocket.js'

function createCanvas(){
    const canvas = document.createElement('canvas');    
    canvas.setAttribute('width', '1100');
    canvas.setAttribute('height', '600');

    document.getElementById('game-container').appendChild(canvas);
}

(() => {
    createCanvas();
    connectToWorld();
})();