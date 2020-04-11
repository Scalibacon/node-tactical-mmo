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
    this.sprite.render(ctx, this.x, this.y);
}

export { Npc };