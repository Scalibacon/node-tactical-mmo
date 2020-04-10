import { subscribe, socket } from './world-socket.js';
import { drawMapTiles } from './draw/tilemap.js';
import { Character } from './draw/Character.js';
import { listenAction } from './world-actions.js';
import { Camera } from './draw/Camera.js';
import * as resources from '../utils/resources.js';
import * as spriter from './draw/spriter.js';

let state, 
    canvas, 
    ctx, 
    camera,
    last_time = Date.now();

function createCanvas(){
    canvas = document.createElement('canvas');    
    canvas.setAttribute('width', '1100');
    canvas.setAttribute('height', '600');
    ctx = canvas.getContext('2d');

    document.getElementById('game-container').appendChild(canvas);
}

export function prepareToDraw(){
    createCanvas();
    spriter.loadSheets();
    subscribe(validateEvents); 
}

function validateEvents(event){
    const func = handle_events[event.type];
    if(func){
        func(event.data);
    }
}

const handle_events = {
    enterMap: function(data){
        for(let i in data.map.players){
            let player = data.map.players[i];
            data.map.players[i] = new Character(player);
        }

        state = data;
        startDrawing();
    },

    addPlayerToMap: function(data){
        state.map.players[data.socketID] = new Character(data.player);;
    },

    removePlayerFromMap: function(data){
        delete state.map.players[data.socketID];
    },

    moveChar: function(data){
        const dir = data.dir;
        const id = data.id;
        for(let i in state.map.players){
            if(i === id){
                const char = state.map.players[i];
                char.move(dir);
                return true;
            }
        }
    }
}

function startDrawing(){
    //validar se o state existe EEEE se os resources carregaram
    if(state && resources.isReady()){
        initializeCamera();
        loop();
    }
}

function initializeCamera(){
    const char = getPlayerChar();
    const height = state.map.layout.length * 50;
    const width = state.map.layout[0].length * 50;

    camera = new Camera(canvas, char, width, height);
}

function getPlayerChar(){
    for(let i in state.map.players){
        if(i === socket.id){
            return state.map.players[i];
        }
    }
    return false;
}

function loop(){
    const now = Date.now();
    const past_millis = (now - last_time);

    last_time = now;

    update(past_millis);
    render();
    listenAction(socket);
    requestAnimationFrame(loop);
}

function update(past_millis){
    for(let i in state.map.players){
        const char = state.map.players[i];
        char.update(past_millis);
    }

    camera.update();
}

function render(past_millis){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
	ctx.translate(Math.floor(-camera.x), Math.floor(-camera.y));

    drawMapTiles(state.map, ctx);

    for(let i in state.map.players){
        const char = state.map.players[i];
        char.render(ctx);
    }

    camera.draw(ctx);

    ctx.restore();	

    //static
}