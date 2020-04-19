import { subscribe, socket } from './world-socket.js';
import * as input from '../world/input.js';
import { drawMapTiles } from './draw/tilemap.js';
import { State } from './draw/State.js';
import { listenAction } from './world-actions.js';
import { Camera } from './draw/Camera.js';
import { cell_size } from '../utils/constants.js';
import * as resources from '../utils/resources.js';

let state, canvas, ctx, camera, animationID;

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
}

function validateEvents(event){
    const func = handle_events[event.type];
    if(func){
        func(event.data);
    }
}

const handle_events = {
    enterMap: function(data){   
        input.start();     
        state = new State(data);
        state.convert();

        startDrawing();
    },

    addPlayerToMap: function(data){
        state.addPlayerToMap(data.socketID, data.player);
    },

    removePlayerFromMap: function(data){
       state.removePlayerFromMap(data.socketID);
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
        state.openDialog(data);
    },

    getActiveAllies: function(data){
        if(state.active_menu && state.active_menu.submenu){
            state.active_menu.submenu.allies = data.allies;
        }        
    },

    showMessage: function(data){
        state.addMessage(data.message);
    }
}

function startDrawing(){
    //validar se o state existe EEEE se os resources carregaram
    if(state && resources.isReady()){  
        cancelAnimationFrame(animationID);      
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
    const millis = (now - state.last_time);

    state.last_time = now;

    update(millis);
    render(millis);
    listenAction(socket, state);
    animationID = requestAnimationFrame(loop);
}

function update(millis){
    for(let i in state.map.players){
        const char = state.map.players[i];
        char.update(millis);
    }

    camera.update();

    state.update(millis);
}

function render(millis){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
	ctx.translate(Math.floor(-camera.x), Math.floor(-camera.y));

    drawMapTiles(state.map, ctx);

    for(let i in state.map.portals){
        state.map.portals[i].render(ctx, millis);
    }

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

    state.render(ctx);      
}