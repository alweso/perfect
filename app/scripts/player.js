var enemyEncounter;
class Player {
	constructor(playerX, playerY, playerWidth, playerHeight, playerSpeed, playerVelX, playerVelY, playerJumping, playerGrounded, allEnemies, animationIsPaused) {
		this.x = playerX;
		this.y =  playerY,
		this.width = playerWidth,
		this.height = playerHeight,
		this.speed = playerSpeed,
		this.velX = playerVelX,
		this.velY = playerVelY,
		this.jumping = playerJumping,
		this.grounded = playerGrounded,
		this.encounterWithPlayer = false,
		this.encounterWithEnemy = function(allEnemies) {
			for (var i = 0; i < allEnemies.length; i++) {
				enemyEncounter = colCheck(this, allEnemies[i]);

				if (enemyEncounter === "l" || enemyEncounter === "r" || enemyEncounter === "t") {
            // alert('you have been killed!');
            $('#kill-message').show();
            animationIsPaused = true;
            setTimeout(function(){
            	window.location.reload();
            }, 1000);
            
            //cancelAnimationFrame();
        } else if (enemyEncounter === 'b') {
        	this.grounded = true;
        	this.jumping = false;
        	allEnemies[i].height = 0;
        	allEnemies[i].width = 0;
        	allEnemies[i].y = allEnemies[i].height + 3000000;
        }
    };
}
}
}