/***
 -Classes de menu devem ter um controle sobre quantos métodos deram subscribe.
 -Quando a classe de menu for destruída, um pop será dado nos observers do input
 pra cada método subscribed. 
 ***/

import { Character } from './Character.js';
import { Npc } from './Npc.js';
import { Dialog } from './Dialog.js';
import { Menu } from './Menu.js';
import { subscribe, popObserver } from '../input.js';

function State(server_state){
    this.mapID = server_state.mapID;
    this.map = server_state.map;

    this.last_time = Date.now();

    this.active_menu = null;

    subscribe(key => {
        toggleMenu(key, this)
    });
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