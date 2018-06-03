 class Wall {
  constructor(wallX, wallY, wallWidth, wallHeight, wallSpeed, wallVelX, wallVelY) {
    var _this = this;
    this.x = wallX;
    this.y =  wallY,
    this.width = wallWidth,
    this.height = wallHeight,
    this.speed = wallSpeed,
    this.velX = wallVelX,
    this.velY = wallVelY,
    this.drawStep = function(ctx) {
        ctx.fillStyle = "brown";
        ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    },
    this.moveStep = function() {
         // this.velX *= friction;
        this.velY += gravity;
        this.grounded = false;

        // _this.x += _this.velX;
        _this.y += _this.velY;
    },
    this.init = function(ctx) {
        // _this.moveStep();
       _this.drawStep(ctx);
    }
  }
}