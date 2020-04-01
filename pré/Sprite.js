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

Sprite.prototype.update = function(timeVariationInSecs) {
    this.frame_index += this.speed * timeVariationInSecs;
}

Sprite.prototype.render = function(ctx, canvasCoord){
    let frame;

    const max = this.arrFrames.length;   
    const roundedIndex = Math.floor(this.frame_index);    
    frame = this.arrFrames[roundedIndex % max];

    let x = JSON.parse(JSON.stringify(this.sourceX));
    let y = JSON.parse(JSON.stringify(this.sourceY));

    /* set the spot we'll pick from the source/sheet */
    x = x + frame * this.sourceWidth;   

    /* depois trocar a image pro resource.get() */
    ctx.drawImage(this.sourceImage,
                  x, y,
                  this.sourceWidth, this.sourceHeight,
                  canvasCoord.x, canvasCoord.y,
                  this.canvasWidth, this.canvasHeight);
}

//export { Sprite };