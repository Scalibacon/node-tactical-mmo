import * as constants from '../../utils/constants.js';
import { manageNpcSprite } from './spriter.js';

function Npc(server_npc){
    this.id = server_npc.id;
    this.name = server_npc.name;
    this.x = server_npc.x * constants.cell_size;
    this.y = server_npc.y * constants.cell_size;
    this.type = server_npc.type;
    this.dir = server_npc.dir;
    this.map = server_npc.map;

    this.sprite = manageNpcSprite(this.type, this.dir);
}

Npc.prototype.render = function(ctx){
    ctx.save();
    this.sprite.render(ctx, this.x, this.y);
    
    ctx.font = "14px arial";    

    const fontX = (this.x + constants.cell_size/2) - (this.name.length * 6)/2;
    const fontY = this.y - 7;

    ctx.shadowColor = "black";
    ctx.shadowBlur = 5;
    ctx.lineWidth = 3;
    ctx.strokeText(this.name, fontX, fontY);

    ctx.shadowBlur=0;
    ctx.fillStyle = "rgba(255, 144, 138, 1)";
    ctx.fillText(this.name, fontX, fontY);
    ctx.restore();
}

export { Npc };