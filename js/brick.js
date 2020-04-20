class Brick{
    constructor(x,y,width,height,color,hits){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#00FF7F";
        this.hits = 1;
    }
    draw(context,scaleX,scaleY){
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x*scaleX,this.y*scaleY,this.width*scaleX,this.height*scaleY);
        context.fill();
    }
    getSides(){
        return[
            new Line({x:this.x,y:this.y},{x:this.x+this.width,y:this.y}),
            new Line({x:this.x+this.width,y:this.y},{x:this.x+this.width,y:this.y+this.height}),
            new Line({x:this.x+this.width,y:this.y+this.height},{x:this.x,y:this.y+this.height}),
            new Line({x:this.x,y:this.y+this.height},{x:this.x,y:this.y})
        ]
    }

}