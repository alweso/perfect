 class Enemy {
  constructor(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed) {
    var _this = this;
    var collision;
    this.x = enemyX;
    this.y =  enemyY,
    this.width = enemyWidth,
    this.height = enemyHeight,
    this.speed = enemySpeed,
    this.velX = 0,
    this.velY = 0,
    this.jumping = false,
    this.grounded = false,
    this.encounterWithPlayer = false,
    this.hitSomethingOnRight = false,
    this.hitSomethingOnLeft = false,
    this.changeDirection = function(friction, gravity, ctx) {
// console.log(_this.speed);
        // console.log(_this.velX);
        if (!_this.hitSomethingOnRight) {
            _this.velX = _this.speed;
        } else if (_this.hitSomethingOnRight) {
            _this.velX = - _this.speed;
        }

        _this.x += _this.velX;
        _this.y += _this.velY;

        if(_this.grounded){
            _this.velY = 0;
        }

        _this.velX *= friction;
        _this.velY += gravity;


        ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    },
    this.checkIfEnemyHitBox = function(allSteps) {
            var collisionWithBox;
            for (var i = 0; i < allSteps.length; i++) {

                collisionWithBox = colCheck(_this, allSteps[i]);

                if (collisionWithBox === "r" ) {
                    _this.hitSomethingOnRight = true;
                    _this.hitSomethingOnLeft = false;
                } 
                else if (collisionWithBox === "l") {
                    _this.hitSomethingOnLeft = true;
                    _this.hitSomethingOnRight = false;
                }
                else if (collisionWithBox === "b") {
                    _this.grounded = true;
                    _this.jumping = false;
                } else if (collisionWithBox === "t") {
                    _this.velY *= -1;
                }
            }
        },
        this.checkIfEnemyHitWall = function(allWalls) {
            var collisionWithWall;
            for (var i = 0; i < allWalls.length; i++) {

                collisionWithWall = colCheck(_this, allWalls[i]);

                if (collisionWithWall === "r" ) {
                    _this.hitSomethingOnRight = true;
                    _this.hitSomethingOnLeft = false;
                } 
                else if (collisionWithWall === "l") {
                    _this.hitSomethingOnLeft = true;
                    _this.hitSomethingOnRight = false;
                }
                else if (collisionWithWall === "b") {
                    _this.grounded = true;
                    _this.jumping = false;
                } else if (collisionWithWall === "t") {
                    _this.velY *= -1;
                }
            }
        },
    this.drawEnemy = function(friction, gravity, ctx) {
        ctx.fillStyle = "blue";
        _this.changeDirection(friction, gravity, ctx);
    },
    this.init = function(allSteps, allWalls, friction, gravity, ctx) {
        _this.grounded = false; 
        _this.checkIfEnemyHitBox(allSteps);
        _this.checkIfEnemyHitWall(allWalls);
        _this.drawEnemy(friction, gravity, ctx);
    };
}
}