 $(document).ready(function() {

     
    var animationIsPaused = false;
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

    let step1 = new Step(400, height -200, 100, 50);
    let step2 = new Step(800, height -50, 100, 50);

    let step3 = new Step(700, height -200, 100, 50);
    let step4 = new Step(900, height -350, 100, 50);
    let step5 = new Step(700, height -500, 100, 50);
    let step6 = new Step(500, height -650, 100, 50);

    let floor = new Step(0, height -20, width, 20);
    let leftWall = new Step(0, -500, 10, height + 500);
    let rightWall = new Step(width - 10, -500, 10, height + 500); 

    let allSteps = [step1, step2, step3, step4, step5, step6, floor, leftWall, rightWall];

    // makePlayer(height, width);  
    makeBoxes(height, width);

    function update() {
    // check keys
    player.movePlayer(gravity, friction);

    drawBoxes(height, width, ctx);
    
    player.grounded = false;
    player.checkIfPlayerHitBox(allSteps);

    for (var i = 0; i < allEnemies.length; i++) {
       allEnemies[i].checkIfEnemyHitBox(allSteps);
   }

    player.encounterWithEnemy(allEnemies);
    
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
