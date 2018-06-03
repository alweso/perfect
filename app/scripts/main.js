 $(document).ready(function() {


    const animationIsPaused = false;
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

    const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = $('#game').width(),
    height = $('#game').height();

    let friction = 0.8,
    gravity = 0.3;


    canvas.width = width;
    canvas.height = height;

    let enemy = new Enemy(10, height - 40, 40, 40, 0.2, 0, 0, false, false, false, false);
    let enemy2 = new Enemy(width - 100, height - 40, 40, 40, 0.2, 0, 0, false, false, false, false);
    let enemy3 = new Enemy(width - 370, height - 370, 40, 40, 0.2, 0, 0, false, false, false, false);

    let allEnemies = [enemy, enemy2, enemy3];

    let player = new Player(400, height - 40, 40, 40, 6, 5, 0, false, false, animationIsPaused);

    let allSteps = [];


    let floor = new Step(0, height -20, width, 20);
    let leftWall = new Step(0, -500, 10, height + 500);
    let rightWall = new Step(width - 10, -500, 10, height + 500); 

    allSteps.push(floor, leftWall, rightWall, 
        new Step(400, height -200, 100, 50), 
        new Step(800, height -50, 100, 50),
        new Step(700, height -200, 100, 50),
        new Step(900, height -350, 100, 50),
        new Step(700, height -500, 100, 50),
        new Step(500, height -650, 100, 50)
        );


    // let step1 = new Step(400, height -200, 100, 50);
    // let step2 = new Step(800, height -50, 100, 50);
    // let step3 = new Step(700, height -200, 100, 50);
    // let step4 = new Step(900, height -350, 100, 50);
    // let step5 = new Step(700, height -500, 100, 50);
    // let step6 = new Step(500, height -650, 100, 50);

    


    // let allSteps = [step1, step2, step3, step4, step5, step6, floor, leftWall, rightWall];

    function update() {
    // clear the movement paths - without this you will have traces of previous movement 
    ctx.clearRect(0, 0, width, height);
   // ctx.fill();


   // initialize everything 
   player.init(gravity, friction, allSteps, allEnemies, ctx);

   for (var i = 0; i < allEnemies.length; i++) {
     allEnemies[i].init(allSteps, friction, gravity, ctx);
 }
 for (var i = 0; i < allSteps.length; i++) {
    allSteps[i].init(ctx);
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
