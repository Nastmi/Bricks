class Ball{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX =  0;
        this.speedY = -6;
        this.startSpeed = this.speedY;
        this.baseX = x;
        this.baseY = y;
    }
    move(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
    draw(){
        ctx.fillStyle = "#FF1493";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();
    }

    scale(scaleX,scaleY){
        this.x = this.baseX*scaleX;
        this.y = this.baseY*scaleY;
    }
}