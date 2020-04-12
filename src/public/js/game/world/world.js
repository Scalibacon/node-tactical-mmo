import { subscribe, socket } from './world-socket.js';
import { drawMapTiles } from './draw/tilemap.js';
import { Character } from './draw/Character.js';
import { Npc } from './draw/Npc.js';
import { Dialog } from './draw/Dialog.js'
import { listenAction } from './world-actions.js';
import { Camera } from './draw/Camera.js';
import { cell_size } from '../utils/constants.js';
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

        for(let i in data.map.npcs){
            let npc = data.map.npcs[i];
            data.map.npcs[i] = new Npc(npc);
        }
        
        state = data;
        state.interaction = null;
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
        const char = getChar(id);
        if(char)            
            char.move(dir);                   
    },

    turnChar: function(data){
        const id = data.id;
        const dir = data.dir;
        const char = getChar(id);
        if(char)
            char.turn(dir);
    },

    startTalk: function(data){
        state.dialog = new Dialog(data);
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
    const char = getChar(socket.id);
    const height = state.map.layout.length * cell_size;
    const width = state.map.layout[0].length * cell_size;

    camera = new Camera(canvas, char, width, height);
}

function getChar(id){
    for(let i in state.map.players){
        if(i === id){
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
    listenAction(socket, state);
    requestAnimationFrame(loop);
}

function update(past_millis){
    for(let i in state.map.players){
        const char = state.map.players[i];
        char.update(past_millis);
    }

    camera.update();

    if(state.dialog){
        state.dialog.update(past_millis);
        if(state.dialog.destroy){
            state.dialog = undefined;
        }
    }
}

function render(past_millis){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
	ctx.translate(Math.floor(-camera.x), Math.floor(-camera.y));

    drawMapTiles(state.map, ctx);

    for(let i in state.map.players){
        if(i === socket.id)
            continue;
        const char = state.map.players[i];
        if(char)
            char.render(ctx);
    }   

    for(let i in state.map.npcs){
        const npc = state.map.npcs[i];
        npc.render(ctx);
    }

    const player = state.map.players[socket.id];
    if(player)
        player.render(ctx);

    ctx.restore();	

    //static
    if(state.dialog){
        state.dialog.render(ctx);
    }    
}