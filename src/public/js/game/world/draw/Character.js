// const cell_size = 50;
import { cell_size } from '../../utils/constants.js';

function Character(server_char){
    this.id = server_char.id;
    this.username = server_char.username;
    this.map = server_char.map;
    this.x = server_char.x * cell_size;
    this.y = server_char.y * cell_size;
    this.width = cell_size;
    this.height = cell_size;
    this.name = server_char.name;
    this.gender = server_char.gender;
    this.job = server_char.job;

    this.dir = server_char.dir;
    this.state = server_char.state;
    this.time_acting = 0;
    // this.sprite = spriter.manage[`${this.job}${this.gender}`]();
}

Character.prototype.move = function(dir){
    this.dir = dir;
    this.state = 'walking';
}

Character.prototype.update = function(past_millis){
    if(this.state !== "idle"){
        this.time_acting += past_millis;
        const variation = (cell_size / 300) * past_millis;
        updatePosition(this, variation);
        if(this.time_acting >= 300){
            this.state = 'idle';
            this.time_acting = 0;
            this.y = Math.round(this.y / cell_size) * cell_size;
            this.x = Math.round(this.x / cell_size) * cell_size;
        }
    }
}

Character.prototype.render = function(ctx){
    // this.sprite.render(ctx, this.x, this.y);

    ctx.fillStyle = "red";
    ctx.fillRect(this.x + (cell_size/2 - this.width/2),
                 this.y + (cell_size/2 - this.height/2),
                 this.width,
                 this.height)
}

function updatePosition(char, variation){
    switch(char.dir){
        case "up":
            char.y = char.y - variation;
            break;
        case "down":
            char.y = char.y + variation;
            break;
        case "left":
            char.x = char.x - variation;
            break;
        case "right":
            char.x = char.x + variation;
            break;
    }
}

export {Character};