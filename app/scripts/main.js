 $(document).ready(function() {
                // body...

                var animationIsPaused = false;

                (function () {
                    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                    window.requestAnimationFrame = requestAnimationFrame;
                })();
               (function () {
                    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                })(); 

     var canvas = document.getElementById("canvas"),
     ctx = canvas.getContext("2d"),
     width = $('#game').width(),
     height = $('#game').height(),
    keys = [],
    friction = 0.8,
    gravity = 0.3;


canvas.width = width;
canvas.height = height;


    makeEnemy(height, width);
    makePlayer(height, width);  
    makeBoxes(height, width);

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

    drawBoxes(height, width, ctx);
    
    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            // alert('left or right');
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            console.log('bottom of player touching');
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            console.log('top of player touching');
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

        var enemyEncounter = colCheck(player, enemy);
        if (enemyEncounter === "l" || enemyEncounter === "r" || enemyEncounter === "t") {
            // alert('you have been killed!');
            $('#kill-message').show();
            animationIsPaused = true;
            //cancelAnimationFrame();
        } else if (enemyEncounter === 'b') {
            player.grounded = true;
            player.jumping = false;
            enemy.height = 0;
            enemy.width = 0;
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

    if(enemy.grounded){
        enemy.velY = 0;
    }

    enemy.velX *= friction;
    enemy.velY += gravity;

    ctx.fillStyle = "blue";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    if(!animationIsPaused) {
        requestAnimationFrame(update);
    }
    
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
