 $(document).ready(function() {
                // body...
           
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = $('#game').width(),
    height = $('#game').height(),
    player = {
        x: 0,
        y: height - 40,
        width: 40,
        height: 40,
        speed: 6,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    enemy = {
        x: 0,
        y: height - 400,
        width: 40,
        height: 40,
        speed: 0.2,
        velX: 5,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

var boxes = [];

// dimensions
// the floor box 
boxes.push({
    x: 0,
    y: height - 20,
    width: width,
    height: 20
});

boxes.push({
    x: 0,
    y: -500,
    width: 10,
    height: height + 500
});

boxes.push({
    x: width - 10,
    y: -500,
    width: 10,
    height: height + 500
});

// the regular boxes 
boxes.push({
    x: 500,
    y: height - 50,
    width: 100,
    height: 50
});
boxes.push({
    x: 700,
    y: height - 200,
    width: 100,
    height: 50
});
boxes.push({
    x: 900,
    y: height - 350,
    width: 100,
    height: 50
});



boxes.push({
    x: 700,
    y: height - 500,
    width: 100,
    height: 50
});
boxes.push({
    x: 500,
    y: height - 650,
    width: 100,
    height: 50
});


canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    
    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

        var dir2 = colCheck(enemy, boxes[i]);

        if (dir2 === "l" || dir2 === "r") {
            enemy.velX = 0;
            enemy.jumping = false;
        } else if (dir2 === "b") {
            enemy.grounded = true;
            enemy.jumping = false;
        } else if (dir2 === "t") {
            enemy.velY *= -1;
        }

    }
    
    if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;

    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // enemy
   
     
            enemy.velX++;
        
enemy.x += enemy.velX;
    enemy.y += enemy.velY;

    enemy.velX *= friction;
    enemy.velY += gravity;

    ctx.fillStyle = "blue";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});
 });