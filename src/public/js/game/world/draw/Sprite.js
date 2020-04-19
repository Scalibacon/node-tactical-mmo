import { cell_size} from '../../utils/constants.js';

function Sprite(sourceImage, sourceX, sourceY, sourceWidth, sourceHeight, arrFrames, canvasWidth, canvasHeight) {
    /* depois pegar do resource */
    this.sourceImage = sourceImage;
    
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.sourceWidth = sourceWidth;
    this.sourceHeight = sourceHeight;

    this.canvasWidth = canvasWidth || sourceWidth;
    this.canvasHeight = canvasHeight || sourceHeight;

    this.speed = 6;
    this.arrFrames = arrFrames;
    this.frame_index = 0;
};

Sprite.prototype.update = function(past_millis) {
    const past_seconds = past_millis/1000;
    this.frame_index += this.speed * past_seconds;
}

Sprite.prototype.render = function(ctx, cx, cy){
    const max = this.arrFrames.length;   
    const roundedIndex = Math.floor(this.frame_index);    
    const frame = this.arrFrames[roundedIndex % max];

    const sx = this.sourceX + (frame * (this.sourceWidth + this.sourceX)); //espaçamento 1 + (1 * (24 + 1))
    const sy = this.sourceY;

    ctx.drawImage(this.sourceImage,
                  sx, sy,
                  this.sourceWidth, this.sourceHeight,
                  cx + (cell_size/2 - this.canvasWidth/2), cy + (cell_size/2 - this.canvasHeight/2),
                  this.canvasWidth, this.canvasHeight);
}

export {Sprite};