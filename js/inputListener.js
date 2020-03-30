//used to control which keys are currently pressed, and which keys have just been clicked
let keys ={
    left:false,
    right:false,
}

document.addEventListener("keydown",setKey);
document.addEventListener("keyup",clearKey);

function setKey(e){
    switch(e.keyCode){
        case 37:
            keys.left = true;
            break;
        case 39:
            keys.right = true;
            break;
    }
}

function clearKey(e){
    switch(e.keyCode){
        case 37:
            keys.left = false;
            break;
        case 39:
            keys.right = false;
            break;
    }
}


