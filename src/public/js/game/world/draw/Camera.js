function Camera(canvas, focus, mapWidth, mapHeight){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.focus = focus;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    this.leftEdge = function(){
        return this.x + (this.width * 0.25);
    };

    this.rightEdge = function(){
        return this.x + (this.width * 0.75);
    };

    this.topEdge = function(){
        return this.y + (this.height * 0.25);
    };

    this.bottomEdge = function(){
        return this.y + (this.height * 0.75);
    }

    this.update = function(){
        if(this.focus.x < this.leftEdge()){
            this.x = focus.x - (this.width * 0.25);
        }
        if(this.focus.x + this.focus.width > this.rightEdge()){
            this.x = this.focus.x + this.focus.width - (this.width * 0.75);
        }
        if(this.focus.y < this.topEdge()){
            this.y = this.focus.y - (this.height * 0.25);
        }
        if(this.focus.y + this.focus.height > this.bottomEdge()){
            this.y = this.focus.y + this.focus.height - (this.height * 0.75);
        }

        if(this.x < 0){
            this.x = 0;
        }       
        if(this.x + this.width > this.mapWidth){
            this.x = this.mapWidth - this.width;
        }
        if(this.y < 0){
            this.y = 0;
        }
        if(this.y + this.height > this.mapHeight){
            this.y = this.mapHeight - this.height;
        }
    }

    this.draw = function(ctx){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(this.x + (this.width * 0.25), this.y + (this.height * 0.25), this.width * 0.5, this.height * 0.5);
        ctx.stroke();
    }
}

export { Camera };
