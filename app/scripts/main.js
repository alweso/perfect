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

    let allEnemies = [];
    allEnemies.push(
            new Enemy(10, height - 40, 40, 40, 4),
            new Enemy(width - 100, height - 40, 40, 40, 4),
            new Enemy(width - 370, height - 370, 40, 40, 7)
        );

    let player = new Player(400, height - 40, 40, 40, 6, false, false, allEnemies, animationIsPaused);

    let allSteps = [];

    let allWalls = [];

    let floor = new Wall(0, height -20, width, 20);
    let leftWall = new Wall(0, -500, 10, height + 500);
    let rightWall = new Wall(width - 10, -500, 10, height + 500); 

    allWalls.push(floor, leftWall, rightWall);

       allSteps.push(
        new Step(400, height -200, 100, 50, 0.5, gravity, friction, ctx, floor), 
        new Step(800, height -50, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -200, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(900, height -350, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -500, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -650, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -800, 400, 50, 0.5, gravity, friction, ctx, floor),

        // new Step(400, height -200, 100, 50, 0.5, gravity, friction, ctx, floor), 
        new Step(300, height -50, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -200, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(900, height -350, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -500, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -650, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -800, 400, 50, 0.5, gravity, friction, ctx, floor),
        
         // new Step(400, height -200, 100, 50, 0.5, gravity, friction, ctx, floor), 
        new Step(300, height -50 - 800, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -200- 800, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(900, height -350- 800, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -500- 800, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -650- 800, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -800- 800, 400, 50, 0.5, gravity, friction, ctx, floor),

         // new Step(400, height -200, 100, 50, 0.5, gravity, friction, ctx, floor), 
        new Step(300, height -50 - 1600, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -200- 1600, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(900, height -350- 1600, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -500- 1600, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(500, height -650- 1600, 100, 50, 0.5, gravity, friction, ctx, floor),
        new Step(700, height -800- 1600, 400, 50, 0.5, gravity, friction, ctx, floor),


        );


    // let setOfSteps = [
    //     new Step(400, height -200, 100, 50, 0.5, gravity, friction, ctx, floor), 
    //     new Step(800, height -50, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(700, height -200, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(900, height -350, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(700, height -500, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(500, height -650, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(700, height -800, 400, 50, 0.5, gravity, friction, ctx, floor)
    // ]
    // var i;
    // var startValue =0;
    // let twoHundredMore = 0;
    // for (i=0;i<10;i++) {
    //     allSteps.push(
    //     // new Step(400, height -200, 100, 50, 0.5, gravity, friction, ctx, floor), 
    //     new Step(100, height -50 - startValue, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(300, height -200 - startValue, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(500, height -350 - startValue, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(700, height -500 - startValue, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(900, height -650 - startValue, 100, 50, 0.5, gravity, friction, ctx, floor),
    //     new Step(1100, height -800 - startValue, 100, 50, 0.5, gravity, friction, ctx, floor)
    //         );
    //       startValue = startValue + 150;
    //       // twoHundredMore = twoHundredMore + 200;
    // };
    // allSteps.push(
    //         setOfSteps
    //     );

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    // setInterval(function(){
    //     allSteps.push(
    //         new Step(getRandomArbitrary(width - width, width), 0, 200, 50, 0.5, gravity, friction, ctx, floor),
    //         new Step(getRandomArbitrary(width - width, width), 0, 100, 50, 0.5, gravity, friction, ctx, floor),
    //         new Step(getRandomArbitrary(width - width, width), 0, 160, 50, 0.5, gravity, friction, ctx, floor),
    //         new Step(getRandomArbitrary(width - width, width), 0, 200, 50, 0.5, gravity, friction, ctx, floor)
    //     );
    // }, 3000);

    // let allSteps = [step1, step2, step3, step4, step5, step6, floor, leftWall, rightWall];

    function update() {
    // clear the movement paths - without this you will have traces of previous movement 
    ctx.clearRect(0, 0, width, height);
   // ctx.fill();


   // initialize everything 
   player.init(gravity, friction, allSteps, allWalls, allEnemies, ctx);

   for (var i = 0; i < allEnemies.length; i++) {
     allEnemies[i].init(allSteps, allWalls, friction, gravity, ctx);
 }

  for (var i = 0; i < allWalls.length; i++) {
    allWalls[i].init(ctx);
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


// Listen for the event.
window.addEventListener('enemyKilled', function (e) { 

    console.log('enemyKilled');
     allEnemies.push(
            new Enemy(width - getRandomArbitrary(width - width, width), height - 370, 40, 40, 7)
        );
 }, false);


});
