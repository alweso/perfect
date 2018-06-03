 class Enemy {
  constructor(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed, enemyVelX, enemyVelY, enemyJumping, enemyGrounded, enemyHitSomethingOnRight, enemyHitSomethingOnLeft) {
    var _this = this;
    var collision;
    this.x = enemyX;
    this.y =  enemyY,
    this.width = enemyWidth,
    this.height = enemyHeight,
    this.speed = enemySpeed,
    this.velX = enemyVelX,
    this.velY = enemyVelY,
    this.jumping = enemyJumping,
    this.grounded = enemyGrounded,
    this.encounterWithPlayer = false,
    this.hitSomethingOnRight = enemyHitSomethingOnRight,
    this.hitSomethingOnLeft = enemyHitSomethingOnLeft,
    this.changeDirection = function(friction, gravity, ctx) {

        if (!_this.hitSomethingOnRight) {
            _this.velX = 5;
        } else if (_this.hitSomethingOnRight) {
            _this.velX = -5;
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
    this.drawEnemy = function(friction, gravity, ctx) {
        ctx.fillStyle = "blue";
        _this.changeDirection(friction, gravity, ctx);
    }
}
}