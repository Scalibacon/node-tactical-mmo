/***
 -Classes de menu devem ter um controle sobre quantos métodos deram subscribe.
 -Quando a classe de menu for destruída, um pop será dado nos observers do input
 pra cada método subscribed. 
 ***/

import { Character } from './Character.js';
import { Npc } from './Npc.js';
import { Dialog } from './Dialog.js';
import { Menu } from './Menu.js';
import { subscribe } from '../input.js';
import { Portal } from './Things.js';

function State(server_state){
    this.mapID = server_state.mapID;
    this.map = server_state.map;

    this.last_time = Date.now();

    this.active_menu = null;

    this.message = {
        msgs: [],
        time: 0
    }

    subscribe(key => {
        toggleMenu(key, this)
    });
}

State.prototype.update = function(millis){
    if(this.active_menu){
        this.active_menu.update(millis);
        if(this.active_menu.destroy){
            this.removeMenu();
        }
    }

    if(this.message.msgs.length > 0){
        this.message.time += millis;
        if(this.message.time > 1000){
            this.message.time = 0;
            this.message.msgs.shift();
        }
    }
}

State.prototype.render = function(ctx){
    if(this.active_menu){
        this.active_menu.render(ctx);
        return;
    }

    if(this.message.msgs.length > 0){
        ctx.font = "bold 18px Arial";
        ctx.shadowColor = "rgba(60, 120, 60, 0.75)";
        ctx.shadowBlur = 5;
        ctx.lineWidth = 3;

        const x = ctx.canvas.clientWidth / 2 - 50 ;
        const y = (ctx.canvas.clientHeight / 2 - 100) - this.message.time / 10;
        ctx.strokeText(this.message.msgs[0], x, y);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(123, 235, 108, 1)";
        ctx.fillText(this.message.msgs[0], x, y);
    }
}

State.prototype.addMessage = function(msg){
    this.message.msgs.push(msg);
}

State.prototype.convert = function(){
    for(let i in this.map.players){
        let player = this.map.players[i];
        this.map.players[i] = new Character(player);
    }

    for(let i in this.map.npcs){
        let npc = this.map.npcs[i];
        this.map.npcs[i] = new Npc(npc);
    }

    for(let i in this.map.portals){
        let portal = this.map.portals[i];
        this.map.portals[i] = new Portal(portal);
    }
}

State.prototype.addPlayerToMap = function(id, server_player){
    this.map.players[id] = new Character(server_player);
}

State.prototype.removePlayerFromMap = function(id){
    delete this.map.players[id];
}

function toggleMenu(key, state){
    if(key !== "ESCAPE"){
        return;
    }

    if(state.active_menu){
        if(state.active_menu.submenu){
            return;
        }
        state.removeMenu();
    } else {
        state.active_menu = new Menu();
    }
}

State.prototype.openDialog = function(data){
    if(!this.active_menu){
        this.active_menu = new Dialog(data);
    }
}

State.prototype.removeMenu = function(){
    this.active_menu.removeSubscription();
    delete this.active_menu;    
}

export { State };