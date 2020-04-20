//used to construct the paddle and control it's movement
class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseSpeed = 4;
        this.speedX = 0;
    }
    move(){
        this.x+=this.speedX;
    }
    getSides(){
        return[
            new Line({x:this.x,y:this.y},{x:this.x+this.width,y:this.y}),
            new Line({x:this.x+this.width,y:this.y},{x:this.x+this.width,y:this.y+this.height}),
            new Line({x:this.x+this.width,y:this.y+this.height},{x:this.x,y:this.y+this.height}),
            new Line({x:this.x,y:this.y+this.height},{x:this.x,y:this.y})
        ]
    }
    draw(context,scaleX,scaleY){
        context.fillStyle = "#FF1493";
        context.beginPath();
        context.rect(this.x*scaleX,this.y*scaleY,this.width*scaleX,this.height*scaleY);
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
