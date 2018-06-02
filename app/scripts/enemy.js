    

    var enemy;
 function makeEnemy(height, width) {
     enemy = {
        x: 0,
        y: height - 40,
        width: 40,
        height: 40,
        speed: 0.2,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    }
    return enemy
 }