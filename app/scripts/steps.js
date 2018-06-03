 class Step {
  constructor(stepX, stepY, stepWidth, stepHeight, stepSpeed, gravity, friction, ctx) {
    var _this = this;
    this.x = stepX;
    this.y =  stepY,
    this.width = stepWidth,
    this.height = stepHeight,
    this.speed = stepSpeed,
    this.velX = 0,
    this.velY = 0,
    this.grounded = false,
    this.drawStep = function(ctx) {
        ctx.fillStyle = "orange";
        ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    },
    this.moveStep = function(ctx) {
        //     if (keys[38] || keys[32]) {
        //     // up arrow or space
        //     if (!this.jumping && this.grounded) {
        //         this.jumping = true;
        //         this.grounded = false;
        //         this.velY = -this.speed * 2;
        //     }
        // }

        // this.velX *= friction;
        this.velY = this.speed;
        this.grounded = false;

        // _this.x += _this.velX;
        _this.y += _this.velY;

        ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    },
    this.init = function(ctx) {
        _this.moveStep(ctx);
       _this.drawStep(ctx);
    }
  }
}