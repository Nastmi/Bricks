//used to construct the paddle and control it's movement
class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseSpeed = 4;
        this.speedX = 0;
        this.frames = 0;
        this.currentImg = 0;
        //used to scale sizes
        this.baseX = x;
        this.baseY = y;
        this.baseWidth = width;
        this.baseHeight = height;
        
    }
    move(){
        this.x+=this.speedX;
        if(this.x <= 0)
            this.x = 0;
        if(this.x+this.width >= canvas.width)
            this.x = canvas.width-this.width
    }
    getSides(){
        return[
            new Line({x:this.x,y:this.y},{x:this.x+this.width,y:this.y}),
            new Line({x:this.x+this.width,y:this.y},{x:this.x+this.width,y:this.y+this.height}),
            new Line({x:this.x+this.width,y:this.y+this.height},{x:this.x,y:this.y+this.height}),
            new Line({x:this.x,y:this.y+this.height},{x:this.x,y:this.y})
        ]
    }
    draw(){
        if(this.frames >= 5){
            this.currentImg++;
            this.frames = 0;
            if(this.currentImg >= 8)
                this.currentImg = 0;
        }
        ctx.drawImage(ship[this.currentImg],this.x,this.y,this.width,this.height);
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
    //changes sizes according to current scale
    scale(scaleX,scaleY){
        this.x=this.baseX*scaleX;
        this.y=this.baseY*scaleY;
        this.width=this.baseWidth*scaleX;
        this.height=this.baseHeight*scaleY;
    }
}
