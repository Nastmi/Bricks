/*Because images need time to load, the first time they are used the sprites flash. I fixed this by loading all the images intially in this file. This is inneficent, but because all the 
images are small (around 300b) and there isn't many of them it works fine.*/ 

let invader = [
    [],
    [],
    [],
    []
];
let ship = [];

function initializeSprites(){
    for(let i=1;i<4;i++){
        for(let j=0;j<12;j++){
            let image = new Image();
            image.src = "./images/invader/invader"+i+"_"+j+".png";
            invader[i].push(image);
        }
    }
    for(let i=0;i<9;i++){
        let image = new Image();
        image.src = "./images/ship/ship_"+i+".png";
        ship.push(image);
    }
}
