 class Step {
  constructor(stepX, stepY, stepWidth, stepHeight, stepSpeed, stepVelX, stepVelY) {
    var _this = this;
    this.x = stepX;
    this.y =  stepY,
    this.width = stepWidth,
    this.height = stepHeight,
    this.speed = stepSpeed,
    this.velX = stepVelX,
    this.velY = stepVelY,
    this.drawStep = function(ctx) {
        ctx.fillStyle = "orange";
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