'use strict';

class Wall {
    constructor(height) {
        this.x = canvas.width;
        this.totalHeight = canvas.height;

        this.width = 50;
        this.height = height;

        this.space = 200;
        this.xSpeed = -5;
        
        this.botWallTop;
        
        this.scored = false;
    }

    show() {
        this.botWallTop = this.height + this.space;

        ctx.fillStyle="#008000"
        ctx.fillRect(this.x, 0, this.width, this.height);
        ctx.fillRect(this.x, this.totalHeight, this.width, -this.totalHeight + this.botWallTop);
    }

    update() {
        this.x += this.xSpeed;
    }
}