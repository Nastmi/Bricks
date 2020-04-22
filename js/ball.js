class Ball{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX =  0;
        this.speedY = -7;
        this.startSpeed = this.speedY;
        this.baseX = x;
        this.baseY = y;
        this.dead = false;
    }
    move(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
    draw(){
        /*ctx.fillStyle = "#FF1493";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();*/
        ctx.drawImage(ballSprite,this.x-16,this.y-16,32,32);
    }

    scale(scaleX,scaleY){
        this.x = this.baseX*scaleX;
        this.y = this.baseY*scaleY;
    }
}