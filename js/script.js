let canvas;
let ctx;
let scaleX;
let scaleY;
let player;
let ball;
let brickArr = [];

function initialize(){
    canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    scaleX = canvas.width/1920;
    scaleY = canvas.height/944;
    console.log(canvas.height);
    ctx = canvas.getContext("2d");
    createStage();
    tick();
}

function tick(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    getDirection();
    player.move();
    ball.move();
    drawStage();
    requestAnimationFrame(tick);
}

function createStage(){
    player = new Paddle(canvas.width/2-100,canvas.height-44,200,40);
    /*todo: read brick positions from file?*/
    for(let i=0;i<5;i++){
        //distance between x= (totalWidth-brickWidth)/(numOfBricks-1)
        brickArr.push(new Brick(430*i,100,200,40));
    }
    ball = new Ball(player.x+player.width/2,player.y-player.heigth,15);
}

function drawStage(){
    player.draw(ctx,scaleX,scaleY);
    ball.draw(ctx,scaleX);
    brickArr.forEach(element => element.draw(ctx,scaleX,scaleY));
}

function getDirection(){
    if(keys.left){
        player.setSpeed("left");
    }
    if(keys.right){
        player.setSpeed("right");
    }
    if(!keys.right && !keys.left){
        player.setSpeed("none");
    }
}

function scale(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    scaleX = canvas.width/1920;
    scaleY = canvas.height/944;
}

window.onload = initialize;
window.onresize = scale;

