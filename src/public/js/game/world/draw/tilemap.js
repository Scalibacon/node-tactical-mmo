import { cell_size } from '../../utils/constants.js';
import * as resources from '../../utils/resources.js';

export function drawMapTiles(map, ctx){
    const layout = map.layout;
    
    for(let i = 0; i < layout.length; i++){
        for(let j = 0; j < layout[i].length; j++){

            // ctx.fillStyle = `rgb(${255 - layout[i][j]*80},255,255)`;
            // ctx.fillRect(j * cell_size, i * cell_size, cell_size, cell_size);

            const sx = layout[i][j] % 10 * 62; //sourceX
            const sy = parseInt(layout[i][j] / 10) * 62; //sourceY
            const sw = 62; //sourceWidth
            const sh = 62; //sourceHeight
            const cx = j * cell_size; //canvasX
            const cy = i * cell_size; //canvasY
            const cw = cell_size; //canvasWidth
            const ch = cell_size; //canvasHeight
            ctx.drawImage(resources.get('/assets/world/tiles/tilemap0.png'), sx, sy, sw, sh, cx, cy, cw, ch);
        }
    }
}