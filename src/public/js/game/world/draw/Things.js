import * as constants from '../../utils/constants.js';
import { manageThingSprite } from './spriter.js';

function Portal(server_portal){
    this.x = server_portal.x * constants.cell_size;
    this.y = server_portal.y * constants.cell_size;
    this.frame_index = 0;

    this.sprite = manageThingSprite('portal');
}

Portal.prototype.render = function(ctx, millis){
    this.sprite.update(millis);
    this.sprite.render(ctx, this.x, this.y)
}

export { Portal };