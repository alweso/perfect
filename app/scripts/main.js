 $(document).ready(function() {

     
    var animationIsPaused = false;
    var enemyHitSomethingOnRight = false;
    var enemyHitSomethingOnLeft = false;
    var enemy2HitSomethingOnRight = false;
    var enemy2HitSomethingOnLeft = false;  
    var enemy2HitSomething = false;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

    
    

    var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = $('#game').width(),
    height = $('#game').height(),
    friction = 0.8,
    gravity = 0.3;


    canvas.width = width;
    canvas.height = height;

    let enemy = new Enemy(10, height - 40, 40, 40, 0.2, 0, 0, false, false, false, false);
    let enemy2 = new Enemy(width - 100, height - 40, 40, 40, 0.2, 0, 0, false, false, false, false);

    let allEnemies = [enemy, enemy2];

    let player = new Player(400, height - 40, 40, 40, 6, 5, 0, false, false, animationIsPaused);

    let step1 = new Step(400, height -200, 100, 50, 0, 0);
    let allSteps = [step1];

    // makePlayer(height, width);  
    makeBoxes(height, width);

    function update() {
    // check keys
    player.movePlayer(gravity, friction);

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
            // console.log('bottom of player touching');
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            // console.log('top of player touching');
            player.velY *= -1;
        }
        
        var dir2 = colCheck(enemy, boxes[i]);

        if (dir2 === "r" ) {
            enemy.hitSomethingOnRight = true;
            enemy.hitSomethingOnLeft = false;
        } 
        else if (dir2 === "l") {
            enemy.hitSomethingOnLeft = true;
            enemy.hitSomethingOnRight = false;
        }
        else if (dir2 === "b") {
            enemy.grounded = true;
            enemy.jumping = false;
        } else if (dir2 === "t") {
            enemy.velY *= -1;
        }

        var dir3 = colCheck(enemy2, boxes[i]);

        if (dir3 === "r" ) {
            enemy2.hitSomethingOnRight = true;
            enemy2.hitSomethingOnLeft = false;
        } 
        else if (dir3 === "l") {
            enemy2.hitSomethingOnLeft = true;
            enemy2.hitSomethingOnRight = false;
        }
        else if (dir3 === "b") {
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

   // draw player 
   ctx.fill();
   ctx.fillStyle = "red";
   ctx.fillRect(player.x, player.y, player.width, player.height);

   // draw enemies

   for (var i = 0; i < allEnemies.length; i++) {
       allEnemies[i].drawEnemy(friction, gravity, ctx);
   }

   //draw steps 

   for (var i = 0; i < allSteps.length; i++) {
        allSteps[i].drawStep(ctx);
   }

   if(!animationIsPaused) {
    requestAnimationFrame(update);
}
}

document.body.addEventListener("keydown", function (e) {
    // console.log(e);
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    // console.log(e);
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
});

});
