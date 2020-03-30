//used to construct the paddle and control it's movement
class Paddle {
    constructor(x, y, width, heigth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = heigth;
        this.baseSpeed = 4;
        this.speedX = 0;
    }
    move(){
        this.x+=this.speedX;
    }
    draw(context,scaleX,scaleY){
        context.fillStyle = "#FF1493";
        context.beginPath();
        context.rect(this.x*scaleX,this.y*scaleY,this.width*scaleX,this.heigth*scaleY);
        context.fill();
    }
    setSpeed(direction){
        switch(direction){
            case "left":
                this.speedX += -this.baseSpeed;
                if(this.speedX <= -this.baseSpeed) this.speedX = -this.baseSpeed;
                break;
            case "right":
                this.speedX += this.baseSpeed;
                if(this.speedX >= this.baseSpeed) this.speedX = this.baseSpeed;
                break;
            case "none":
                this.speedX = 0;
                break;
        }
    }
}
