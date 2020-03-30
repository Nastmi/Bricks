class Brick{
    constructor(x,y,width,heigth,color,hits){
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = heigth;
        this.color = "#00FF7F";
        this.hits = 1;
    }
    draw(context,scaleX,scaleY){
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x*scaleX,this.y*scaleY,this.width*scaleX,this.heigth*scaleY);
        context.fill();
    }
}