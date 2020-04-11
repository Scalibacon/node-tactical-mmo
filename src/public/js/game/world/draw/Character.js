import * as constants from '../../utils/constants.js';
import { manageCharSprite } from './spriter.js';

function Character(server_char){
    this.id = server_char.id;
    this.username = server_char.username;
    this.map = server_char.map;
    this.x = server_char.x * constants.cell_size;
    this.y = server_char.y * constants.cell_size;
    this.width = constants.cell_size;
    this.height = constants.cell_size;
    this.name = server_char.name;
    this.gender = server_char.gender;
    this.job = server_char.job;

    this.dir = server_char.dir;
    this.state = server_char.state;
    this.time_acting = 0;
    // this.sprite = spriter.manage[`${this.job}${this.gender}`]();

    this.sprites = manageCharSprite(this.job, this.gender);
}

Character.prototype.move = function(dir){
    this.turn(dir);
    this.state = 'walking';
}

Character.prototype.turn = function(dir){
    this.dir = dir;
}

Character.prototype.update = function(past_millis){
    if(this.state !== "idle"){
        this.sprites[this.dir].update(past_millis);
        this.time_acting += past_millis;
        const variation = (constants.cell_size / 300) * past_millis;
        updatePosition(this, variation);
        if(this.time_acting >= 300){
            this.state = 'idle';
            this.time_acting = 0;
            this.y = Math.round(this.y / constants.cell_size) * constants.cell_size;
            this.x = Math.round(this.x / constants.cell_size) * constants.cell_size;
        }        
    }
}

Character.prototype.render = function(ctx){
    this.sprites[this.dir].render(ctx, this.x, this.y);
}

function updatePosition(char, variation){
    switch(char.dir){
        case constants.dir.up:
            char.y = char.y - variation;
            break;
        case constants.dir.down:
            char.y = char.y + variation;
            break;
        case constants.dir.left:
            char.x = char.x - variation;
            break;
        case constants.dir.right:
            char.x = char.x + variation;
            break;
    }
}

export {Character};