import { subscribe, socket } from '../../world-socket.js';
import { drawMapTiles } from './tilemap.js';
import { Character } from './Character.js';
import { listenAction } from './world-actions.js';
import { Camera } from './Camera.js';
import * as sprite_manager from './sprite-manager.js';

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
    subscribe(validateEvents);   
    // sprite_manager.loadSpritesheets(startDrawing);   
    sprite_manager.loadSpritesheets();    
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
    if(state && sprite_manager.isReady()){
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
	ctx.translate(-camera.x, -camera.y);

    drawMapTiles(state.map, ctx);

    for(let i in state.map.players){
        const char = state.map.players[i];
        char.render(ctx);
    }

    camera.draw(ctx);

    ctx.restore();	

    //static
}