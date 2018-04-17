'use strict';

class Bird {
    constructor() {
        this.x = 250;
        this.y = canvas.height / 2;

        this.gravity = .9;
        this.yVelocity = 0;
        this.flySpeed = -25;
    }

    show() {
        this.midTop = this.y - 20;
        this.midBot = this.y;
        this.midR = this.x + 8;
        this.midL = this.x - 8;

        this.wingTop = this.y - 15;
        this.wingBot = this.y - 5;
        
        this.rightWingR = this.x + 25;

        this.leftWingL = this.x - 25;

        ctx.fillStyle = "#FF0000"
        ctx.beginPath();
        ctx.moveTo(this.x, this.midBot);
        ctx.lineTo(this.rightWingR, this.wingTop);
        ctx.lineTo(this.midR, this.y - 10);
        ctx.lineTo(this.x, this.midTop);
        ctx.lineTo(this.midL, this.y - 10);
        ctx.lineTo(this.leftWingL, this.wingTop);
        ctx.fill();
    }

    fly() {
        this.yVelocity += this.flySpeed;
        if(this.yVelocity < this.flySpeed) {
            this.yVelocity = this.flySpeed;
        }
    }

    update() {
        this.yVelocity += this.gravity;
        this.y += this.yVelocity;
        if (this.y < 20) {
            this.y = 20;
        }
        if (this.y > canvas.height) {
            this.y = canvas.height;
            this.yVelocity = 0;
        }
    }

    testingMovement(arg) {
        if (arg == 'up') {
            this.y -= 1;
        } else if (arg == 'down') {
            this.y += 1;
        } else if (arg == 'right') {
            this.x += 1;
        } else if (arg == 'left') {
            this.x -= 1;
        }

    }

    passedWall(arr) {
        if(arr[1].scored == false && this.x > arr[1].x + arr[1].width) {
            arr[1].scored = true;
            return true;
        } else {
            return false;
        }
    }

    intersects(otherObj) {
        let otherObjTop = otherObj.botWallTop;
        let otherObjBot = otherObj.height;
        let otherObjR = otherObj.x + otherObj.width;
        let otherObjL = otherObj.x;

        let midTopColl = this.midTop < otherObjBot;
        let midBotColl = this.midBot > otherObjTop

        let wingTopColl = this.wingTop < otherObjBot;
        let wingBotColl = this.wingBot > otherObjTop;

        // let col of a section = (( col on top || col on bottom) && (col on right side && col on left side));
        let midColl = ((midTopColl || midBotColl) && (this.midR > otherObjL && this.midL < otherObjR));
        // let col of a section = (( col on top || col on bottom) && ((col on Rwing right side && col on Rwing left side)) || (col on Lwing right side && col on Lwing left side));
        let wingColl = ((wingTopColl || wingBotColl) && ((this.rightWingR > otherObjL && this.midR < otherObjR) || (this.midL > otherObjL && this.leftWingL < otherObjR)));


        return (midColl || wingColl);
    }
}
