/*In the classic game the ball bounces as follows:
    Whenever the ball hits a brick, wall, or the sides of the player the speed is simply reversed:
        -if(rightLeftCollision) speedX = -speedX
        -else if(topBottomCollsion) speedY = -speedY
    HOWEVER if the ball hits the TOP of the paddle, then it's speed should be procentually changed based on how far away from the middle of the paddle it is as follows
        speedX = baseSpeedX*Math.sin(angle);, in this case angle being percent from middle
        speedY = baseSPeedY*Math.cos(angle);, angle as above
    I also tried applying the above formula to every colidable surface (bricks, walls), but it produced some unexpected results and the balle became stuck more often than i liked.
*/
let projectedLines = [];
let info = [];
function testCollisions(ball,player,arrBricks){
    projectedLines = [];
    info = [];
    //test and resolve collisions for bricks
    arrBricks.forEach(element => {
        let sides = element.getSides();
        if(circleIntersectsLine(ball,sides[0])[0] || circleIntersectsLine(ball,sides[2])[0])
            ball.speedY = -ball.speedY
        else if(circleIntersectsLine(ball,sides[1])[0] || circleIntersectsLine(ball,sides[3])[0])
            ball.speedX = -ball.speedX; 
    });
    let sides = player.getSides();
    //test and resolve collisions for the TOP of the paddle
    if(circleIntersectsLine(ball,sides[0])[0]){
        c = circleIntersectsLine(ball,sides[0])[1];
        let relativeIntersect = (sides[0].startPoint.x+(player.width/2))-c.x;
        let normalizedIntersect = (relativeIntersect/(player.width/2));
        ball.speedX = ball.startSpeed*Math.sin(normalizedIntersect);
        ball.speedY = ball.startSpeed*Math.cos(normalizedIntersect);
    }
    //test and resolve collisions for the rest of the paddle
    else if(circleIntersectsLine(ball,sides[2])[0]){
        ball.speedY = -ball.speedY;
    }
    else if(circleIntersectsLine(ball,sides[1])[0] || circleIntersectsLine(ball,sides[3])[0]){
        ball.speedX = -ball.speedX;
    }
    //test and resolve collisions for the canvas sides
    let canvasSides = [
        new Line({x:0,y:0},{x:0+canvas.clientWidth,y:0}),
        new Line({x:0+canvas.clientWidth,y:0},{x:0+canvas.clientWidth,y:0+canvas.clientHeight}),
        new Line({x:0+canvas.clientWidth,y:0+canvas.clientHeight},{x:0,y:0+canvas.clientHeight}),
        new Line({x:0,y:0+canvas.clientHeight},{x:0,y:0})
    ];
    if(circleIntersectsLine(ball,canvasSides[0])[0] || circleIntersectsLine(ball,canvasSides[2])[0])
        ball.speedY = -ball.speedY;
    else if(circleIntersectsLine(ball,canvasSides[1]) || circleIntersectsLine(ball,canvasSides[3]))
        ball.speedX = -ball.speedX;
}


function circleIntersectsLine(circle,line){
    //startPoint - endPoint
    let segV = line.segmentVector();
    //circle coords - startPoint
    let ptV = {x:circle.x-line.startPoint.x,y:circle.y-line.startPoint.y};
    //magnitude of segV
    let magnitude = Math.sqrt(segV.x*segV.x + segV.y*segV.y);
    //normalization of segV
    let normV = {x:segV.x/magnitude,y:segV.y/magnitude};
    //dot product
    let dotProduct = ptV.x*normV.x+ptV.y*normV.y;
    let closest;
    if(dotProduct < 0)
        closest = {x:line.startPoint.x,y:line.startPoint.y};
    else if(dotProduct > magnitude)
        closest = {x:line.endPoint.x,y:line.endPoint.y};
    else{
        let dotProductV = {x:normV.x*dotProduct,y:normV.y*dotProduct};
        closest = {x:dotProductV.x+line.startPoint.x,y:dotProductV.y+line.startPoint.y};
    }
    projectedLines.push(closest);
    let distanceV = {x:circle.x-closest.x,y:circle.y-closest.y};
    let distance = Math.sqrt(distanceV.x*distanceV.x + distanceV.y*distanceV.y);
    if(distance <= circle.radius){
        return [true,closest];
    }
    return false;
}

