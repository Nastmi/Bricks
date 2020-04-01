class Ball{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = 5;
        this.speedY = -5;
    }
    move(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
    draw(context,scaleX){
        context.fillStyle = "#FF1493";
        context.beginPath();
        context.arc(this.x*scaleX,this.y*scaleX,this.radius*scaleX,0,2*Math.PI);
        context.fill();
    }
}