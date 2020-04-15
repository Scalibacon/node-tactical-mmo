const Constants = require('../utils/Constants');

function WorldCharacter(game_user){
    this.user_id = game_user.id;
    this.id = game_user.char_id;
    this.username = game_user.username;
    this.map = parseInt(game_user.map);
    this.x = parseInt(game_user.x);
    this.y = parseInt(game_user.y);
    this.name = game_user.name;
    this.gender = game_user.gender;
    this.progress = JSON.parse(game_user.progress);
    this.job = game_user.job;
    this.dir = Constants.dir.down;
    this.state = 'idle';
}

WorldCharacter.prototype.move = function(dir, map){     
    if(this.state !== 'idle'){
        return {moved: false, turned: false};
    }    

    this.dir = dir;

    const action = actions[Constants.getDir(dir)];
    if(action){
        return {moved: action(this, map), turned: true};
    } 

    return {turned: true};
}

WorldCharacter.prototype.interact = function(map){
    if(this.state !== 'idle'){
        return false;
    }

    let aimX, aimY;

    switch(this.dir){
        case Constants.dir.up:
            aimY = this.y - 1;
            aimX = this.x;
            break;
        case Constants.dir.down:
            aimY = this.y + 1;
            aimX = this.x;
            break;
        case Constants.dir.left:
            aimX = this.x - 1;
            aimY = this.y;
            break;
        case Constants.dir.right:
            aimX = this.x + 1;
            aimY = this.y;
            break;
        default:
            return false;
    }

    for(let i in map.npcs){
        let npc = map.npcs[i];
        if(npc.x === aimX && npc.y === aimY){
            const resp = npc.talk(this);
            return resp;
        }
    }
    return false;
}

const actions = {
    up: function(char, map){
        if(!checkNewPosition(char.x, char.y-1, map)){
            return false;
        }
        char.state = 'walking';
        char.y--;
        restoreCharState(char);

        return true;
    },

    down: function(char, map){
        if(!checkNewPosition(char.x, char.y+1, map)){
            return false;
        }
        char.state = 'walking';
        char.y++;
        restoreCharState(char);

        return true;
    },

    right: function(char, map){
        if(!checkNewPosition(char.x+1, char.y, map)){
            return false;
        }
        char.state = 'walking';
        char.x++;
        restoreCharState(char);

        return true;
    },

    left: function(char, map){
        if(!checkNewPosition(char.x-1, char.y, map)){
            return false;
        }
        char.state = 'walking';
        char.x--;
        restoreCharState(char);

        return true;
    }
}

function checkNewPosition(x, y, map){
    const layout = map.layout;
    const npcs = map.npcs;

    if(x < 0 || x >= layout[0].length){
        return false;
    }
    if(y < 0 || y >= layout.length){
        return false;
    }

    for(let i in npcs){
        const npc = npcs[i];
        if(npc.x === x && npc.y === y){
            return false;
        }
    }

    const tile = layout[y][x];

    if(tile === 01 || tile === 02 || tile === 03 || tile === 04 || tile === 05 || tile === 06 || 
    tile === 10 || tile === 11 || tile === 13 || tile === 20 || tile === 21 || tile === 22 || 
    tile === 23 || tile === 24 || tile === 07){
        return false;
    }
    
    return true;
}

function restoreCharState(char){
    setTimeout(() => {
        char.state = 'idle';
    },300);
}

module.exports.create = function(game_user){
    return new WorldCharacter(game_user);
}

