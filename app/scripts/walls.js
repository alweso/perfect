 class Wall {
  constructor(wallX, wallY, wallWidth, wallHeight) {
    var _this = this;
    this.x = wallX;
    this.y =  wallY,
    this.width = wallWidth,
    this.height = wallHeight
    this.drawStep = function(ctx) {
        ctx.fillStyle = "brown";
        ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
    },
    this.init = function(ctx) {
        // _this.moveStep();
       _this.drawStep(ctx);
    }
  }
}