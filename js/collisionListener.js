function testCollisions(ball,player,arrBricks){
    let wall;
    arrBricks.forEach(element => {
        if(circleIntersectsRectangle(ball,element, wall)){

        }
    });
}

function circleIntersectsRectangle(circle, rectangle, wall){
    let nearestX = Math.max(rectangle.x,Math.min(circle.x,rectangle.x+rectangle.width));
    let nearestY = Math.max(rectangle.y,Math.min(circle.y,rectangle.y+rectangle.heigth));
    //if()
    return (nearestX * nearestX + nearestY * nearestY) < (circle.r*circle.r);
}
