    

 //    var enemy;
 // function makeEnemy(height, width) {
 //     enemy = {
 //        x: 0,
 //        y: height - 40,
 //        width: 40,
 //        height: 40,
 //        speed: 0.2,
 //        velX: 0,
 //        velY: 0,
 //        jumping: false,
 //        grounded: false
 //    }
 //    return enemy
 // }

 class Enemy {
  constructor(enemyX, enemyY, enemyWidth, enemyHeight, enemySpeed, enemyVelX, enemyVelY, enemyJumping, enemyGrounded) {
        this.x = enemyX;
        this.y =  enemyY,
        this.width = enemyWidth,
        this.height = enemyHeight,
        this.speed = enemySpeed,
        this.velX = enemyVelX,
        this.velY = enemyVelY,
        this.jumping = enemyJumping,
        this.grounded = enemyGrounded,
        this.encounterWithPlayer = false
  }
}