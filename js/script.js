let canvas;
let ctx;
let scaleX;
let scaleY;
let player;
let brickArr = [];
let ballArr = [];
let hitsUntilBall = 10;
let date = new Date();
let seconds = 0;
let moveSeconds = 1;
let score = 0;
let currentStage = 1;
let canMove = false;
let scores = [];
let name;
let song = new Audio("./sound/song.mp3");
let music = true;
async function initialize(){
    canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx = canvas.getContext("2d");
    if(localStorage.getItem("scores"))
        scores = JSON.parse(localStorage.getItem("scores"));
    enterName();
}

function gameStart(){
    initializeSprites();
    createStage();
    drawStage();
    tick();
}

function tick(){
    let newDate = new Date();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    getDirection();
    if(canMove){
        song.play();
        player.move();
        ballArr.forEach(element => {
            element.move();
        })
        ballArr.forEach(element => {
            testCollisions(element,player,brickArr);
        })
        if(newDate-date >= 1000){
            let min = Math.floor(seconds/60);
            let sec = Math.floor(seconds-(60*min));
            if(sec<10)
                sec="0"+sec;
            document.getElementById("timer").innerHTML =min+":"+sec;
            date = new Date();
            seconds++;
            document.getElementById("moveTimer").innerHTML = moveSeconds;
            moveSeconds--;
        }
        if(moveSeconds <= 0){
            brickArr.forEach(element => {
                element.y+=50;
                if(element.y >= player.y-element.height)
                    endGame();
            })
            moveSeconds = 15;
        }
    }
    if(hitsUntilBall <= 0){
        hitsUntilBall = 10;
        ballArr.push(new Ball(768,755-100,16));
    }
    drawStage();
    removeDead();
    document.getElementById("score").innerHTML = "Score "+score;
    document.getElementById("ballTimer").innerHTML =hitsUntilBall;
    requestAnimationFrame(tick);
}

function nextStage(){
    song.pause();
    canMove = false;
    currentStage++;
    if(currentStage >= 5)
        victory();
    let stageToWrite;
    if(currentStage == 1)
        stageToWrite = stage1;
    else if(currentStage == 2)
        stageToWrite = stage2;
    else if(currentStage == 3)
        stageToWrite = stage3;
    else if(currentStage == 4)
        stageToWrite = stage4;
    document.getElementById("title").innerHTML = stageToWrite[0];
    Swal.fire({
        imageUrl:"./images/commander.png",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;'>New message</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>Hello again. Good job on those aliens out there! But "+stageToWrite[0]+" is also getting attacked! Go and protect it!</p>",
        confirmButtonText: "Next station!"
    }).then().then((text) => {
        if(text.value)
            createStage();
    })
}

function createStage(){
    brickArr = [];
    ballArr = [];
    moveSeconds = 15;
    hitsUntilBall = 10;
    player = new Paddle(768-75,850-40,150,32);
    let stageToCreate = [];
    if(currentStage == 1)
        stageToCreate = stage1;
    else if(currentStage == 2)
        stageToCreate = stage2;
    else if(currentStage == 3)
        stageToCreate = stage3;
    else if(currentStage == 4)
        stageToCreate = stage4;
    createBrickArray(stageToCreate);
    ballArr.push(new Ball(768,755-100,16));
    scale();
}

function createBrickArray(stage){
    for(let i=1;i<stage.length;i++){
        let currentLine = stage[i];
        for(let j=0;j<currentLine.length;j++){
            let char = currentLine.charAt(j);
            if(char != "x"){
                char = parseInt(char);
                brickArr.push(new Brick(67*j,100*i,64,64,char));
            }
        }
    }
}

function drawStage(){
    let gradient = ctx.createLinearGradient(canvas.width/2,200,canvas.width/2,canvas.height+100);
    gradient.addColorStop(0,"rgba(3,0,60,1)");
    gradient.addColorStop(1,"rgba(56,99,255,1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
    player.frames++;
    ballArr.forEach(element =>{
        element.draw();
    })
    brickArr.forEach(element => {
        element.draw(ctx);
        element.frames++;
    })
}

function removeDead(){
    for(let i=0;i<brickArr.length;i++){
        if(brickArr[i].hits <= 0)
            brickArr.splice(i,1);
        if(brickArr.length <= 0)
            nextStage();
    }
    for(let i=0;i<ballArr.length;i++){
        if(ballArr[i].dead){
            ballArr.splice(i,1);
            if(ballArr.length <= 0)
                endGame();
        }
    }
}

function enterName(){
    Swal.fire({
        icon:"question",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;'>Entry</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>Please enter your name, Agent.</p>",
        input:"text",
        confirmButtonText: "Confirm"
    }).then((text) => {
        if(text.value){
            name = text.value;
            firstMessage();
        }
        else{
            enterName();
        } 
    })
}

function victory(){
    song.pause();
    canMove = false;
    let min = Math.floor(seconds/60);
    let sec = Math.floor(seconds-(60*min));
    if(sec<10)
        sec="0"+sec;
    scores.push({player:name,score:score,time:min+":"+sec});
    localStorage.setItem("scores",JSON.stringify(scores));
    Swal.fire({
        imageUrl:"./images/commander.png",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;font-color:#00FF00'>Victory!</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>You are truly amazing agent "+name+". You sent those aliens right back to where they came from! Earth is once again victorious!<br/>Your score was "+score+"</p>",
        confirmButtonText: "Play again?",
    }).then().then((result) => {
        if(result.value){
            currentStage = 1;
            createStage();
        }
    })
}

function firstMessage(){
    Swal.fire({
        imageUrl:"./images/commander.png",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;'>Emergency!</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>Hello agent "+name+". This is agent Phil Coulson from the main base. Aliens are currently attacking our stations, and we must stop them as soon as possible. You are our best pilot. We do not have much time.</p>",
        confirmButtonText: "Let's fight!"
    }).then().then((result) => {
        if(result.value){
            gameStart();
        }
    })
}

function displayTutorial(){
    Swal.fire({
        icon: "question",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;'>How to play!</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>Press space to begin the game. Use the left and right arrow keys to move the paddle. You need to bounce the missile into the aliens. Green aliens only need to be hit once, while orange need to be hit twice and purple ones three times. Every 10 hits you will get an additional missile. Every 15 seconds the aliens will move closer. Don't lose all the missiles or let the aliens reach you or you will lose! </p>",
        confirmButtonText: "Confirm!"
    })
}

function displayScore(){
    let scoreString = "";
    scores.forEach(element => {
        scoreString+= element.player +" "+element.score+" "+element.time+"<br/>";
    })
    Swal.fire({
        imageUrl:"./images/award.png",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;'>Scores</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>"+scoreString+"</p>",
        confirmButtonText: "Confirm!"
    })
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
    ballArr.forEach(element =>{
        element.scale(scaleX,scaleY);
    })
}

function endGame(){
    song.pause();
    song.currentTime = 0;
    canMove = false;
    let min = Math.floor(seconds/60);
    let sec = Math.floor(seconds-(60*min));
    if(sec<10)
        sec="0"+sec;
    scores.push({player:name,score:score,time:min+":"+sec});
    localStorage.setItem("scores",JSON.stringify(scores));
    Swal.fire({
        imageUrl:"./images/invader/invader2_0.png",
        background:"#288e8f url(./images/transparentBackground.png)" ,
        title:"<p style='color:#000000;font-size:2.0em;'>Failure</p>",
        html:"<p style='color:#000000;font-size:1.5em;'>You failed to stop the alien invasion!<br/>Your score was "+score+"</p>",
        confirmButtonText: "Restart",
    }).then().then((result) => {
        if(result.value){
            seconds = 0;
            score = 0;
            currentStage = 1;
            createStage();
        }
    })
}

function reverseMusic(){
    let but = document.getElementById("musicButton");
    if(music){
        but.src = "./images/speakerOff.png";
        music = false;
        song.volume = 0;
    }
    else{
        but.src = "./images/speakerOn.png";
        music = true;
        song.volume = 1;
    }
}


window.onload = initialize;
window.onresize = scale;

