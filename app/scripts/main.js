 $(document).ready(function() {

   
    var animationIsPaused = false;
    var enemyHitSomething = false;
    var enemy2HitSomething = false;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

                
            

    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = $('#game').width(),
    height = $('#game').height(),
    keys = [],
    friction = 0.8,
    gravity = 0.3;


    canvas.width = width;
    canvas.height = height;

    let enemy = new Enemy(0, height - 40, 40, 40, 0.2, 0, 0, false, false);
    let enemy2 = new Enemy(width - 100, height - 40, 40, 40, 0.2, 0, 0, false, false);

    let allEnemies = [enemy, enemy2];

    let player = new Player(400, height - 40, 40, 40, 6, 5, 0, false, false, animationIsPaused);
    // makePlayer(height, width);  
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

        if (dir2 === "r") {
            enemy.velX = 0;
            // enemy.jumping = false;
            // if (player.velX > -player.speed) {
                enemyHitSomething = true;
                enemy.velX = -5;
            // dir2 === null;
        // }
        } else if (dir2 === "b") {
            enemy.grounded = true;
            enemy.jumping = false;
        } else if (dir2 === "t") {
            enemy.velY *= -1;
        }

         var dir3 = colCheck(enemy2, boxes[i]);

        if (dir3 === "r") {
            enemy2.velX = 0;
            // enemy.jumping = false;
            // if (player.velX > -player.speed) {
                enemy2HitSomething = true;
                enemy2.velX = -5;
            // dir2 === null;
        // }
        } else if (dir3 === "b") {
            enemy2.grounded = true;
            enemy2.jumping = false;
        } else if (dir3 === "t") {
            enemy2.velY *= -1;
        }

        player.encounterWithEnemy(allEnemies);
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

    if (!enemyHitSomething) {
        enemy.velX++;
    }
    
    enemy.x += enemy.velX;
    enemy.y += enemy.velY;

    if(enemy.grounded){
        enemy.velY = 0;
    }

    enemy.velX *= friction;
    enemy.velY += gravity;

    ctx.fillStyle = "blue";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // enemy2

    if (!enemy2HitSomething) {
        enemy2.velX--;
    }
    
    enemy2.x += enemy2.velX;
    enemy2.y += enemy2.velY;

    if(enemy2.grounded){
        enemy2.velY = 0;
    }

    enemy2.velX *= friction;
    enemy2.velY += gravity;

    ctx.fillStyle = "blue";
    ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);

    if(!animationIsPaused) {
        requestAnimationFrame(update);
    }
    
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
