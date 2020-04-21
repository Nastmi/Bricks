let canvas;
let ctx;
let scaleX;
let scaleY;
let player;
let ball;
let brickArr = [];
let date = new Date();
let seconds = 0;
let score = 0;
async function initialize(){
    canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx = canvas.getContext("2d");
    initializeSprites();
    createStage();
    scale();
    drawStage();
    tick();
}

function tick(){
    let newDate = new Date();
    if(newDate-date >= 1000){
        let min = Math.floor(seconds/60);
        let sec = Math.floor(seconds-(60*min));
        if(sec<10)
            sec="0"+sec;
        document.getElementById("timer").innerHTML =min+":"+sec;
        date = new Date();
        seconds++;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    getDirection();
    player.move();
    ball.move();
    testCollisions(ball,player,brickArr);
    drawStage();
    removeBricks();
    document.getElementById("score").innerHTML = "Score "+score;
    requestAnimationFrame(tick);
}

function createStage(){
    player = new Paddle(768-100,850-40,150,32);
    /*todo: read brick positions from file?*/
    for(let i=0;i<5;i++){
        //distance between x= (totalWidth-brickWidth)/(numOfBricks-1)
        brickArr.push(new Brick(334*i,100,64,64));
    }
    ball = new Ball(768,755-100,15);
}

function drawStage(){
    let gradient = ctx.createLinearGradient(canvas.width/2,200,canvas.width/2,canvas.height+100);
    gradient.addColorStop(0,"rgba(3,0,60,1)");
    gradient.addColorStop(1,"rgba(56,99,255,1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
    player.frames++;
    ball.draw();
    brickArr.forEach(element => {
        element.draw(ctx);
        element.frames++;
    })
}

function removeBricks(){
    for(let i=0;i<brickArr.length;i++){
        if(brickArr[i].hits <= 0)
            brickArr.splice(i,1);
    }
}

function displayTutorial(){
    Swal.fire({
        title:"Tutorial",
        text:"Use the left and right arrow keys to move the paddle, and bounce the ball into the invaders. Purple and orange take more hits to kill. The invaders move down, so you better win quickly!",
        icon:"question"
    });
}

function displayScore(){
    Swal.fire({
        title:"Scores",
        text:"Not yet in existance",
        icon:"question"
    });
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
//when page is resized, canvas adapts, and so do all elements
function scale(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    scaleX = canvas.width/1536;
    scaleY = canvas.height/850;
    brickArr.forEach(element => {
        element.scale(scaleX,scaleY);
    })
    player.scale(scaleX,scaleY);
    ball.scale(scaleX,scaleY);
}

function endGame(){
    Swal.fire({
        title:"Failure!",
        text:"You failed to stop the alien invasion!",
        icon:"error"
    });
}


window.onload = initialize;
window.onresize = scale;

