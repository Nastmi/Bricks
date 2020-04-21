class Brick{
    constructor(x,y,width,height,color,hits){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "#00FF7F";
        this.hits = 3;
        this.frames = 0;
        this.currentImg = 0;
        //used to scale sizes
        this.baseX = x;
        this.baseY = y;
        this.baseWidth = width;
        this.baseHeight = height;
        
    }
    draw(){
        console.log("drowd");
       /* context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x,this.y,this.width,this.height);
        context.fill();*/
        if(this.frames >= 5){
            this.currentImg++;
            this.frames = 0;
            if(this.currentImg >= 11)
                this.currentImg = 0;
        }
        ctx.drawImage(invader[this.hits][this.currentImg],this.x,this.y,this.width,this.height);
    }
    getSides(){
        return[
            new Line({x:this.x,y:this.y},{x:this.x+this.width,y:this.y}),
            new Line({x:this.x+this.width,y:this.y},{x:this.x+this.width,y:this.y+this.height}),
            new Line({x:this.x+this.width,y:this.y+this.height},{x:this.x,y:this.y+this.height}),
            new Line({x:this.x,y:this.y+this.height},{x:this.x,y:this.y})
        ]
    }

    scale(scaleX,scaleY){
        //changes sizes according to current scale
        this.x=this.baseX*scaleX;
        this.y=this.baseY*scaleY;
        this.width=this.baseWidth*scaleX;
        this.height=this.baseHeight*scaleY;
    }

}