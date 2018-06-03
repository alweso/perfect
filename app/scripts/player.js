var enemyEncounter;
var enemyKilled;
var keys = [];


class Player {
	constructor(playerX, playerY, playerWidth, playerHeight, playerSpeed, playerVelX, playerVelY, playerJumping, playerGrounded, allEnemies, animationIsPaused) {
		var _this = this;
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
		},
		this.checkIfPlayerHitBox = function(allSteps) {
			var collisionWithBox;
			for (var i = 0; i < allSteps.length; i++) {

				collisionWithBox = colCheck(_this, allSteps[i]);

		        if (collisionWithBox === "l" || collisionWithBox === "r") {
		            _this.velX = 0;
		            _this.jumping = false;
		        } else if (collisionWithBox === "b") {
		            _this.grounded = true;
		            _this.jumping = false;
		        } else if (collisionWithBox === "t") {
		            _this.velY *= -1;
		        }
			}

			// this goes somewhere else, another player method
			  if(_this.grounded){
			       _this.velY = 0;
			   }
		},

		this.movePlayer = function(gravity, friction) {
		if (keys[38] || keys[32]) {
	        // up arrow or space
	        if (!this.jumping && this.grounded) {
	            this.jumping = true;
	            this.grounded = false;
	            this.velY = -this.speed * 2;
	        }
	    }
	    if (keys[39]) {
	        // right arrow
	        if (this.velX < this.speed) {
	            this.velX++;
	        }
	    }
	    if (keys[37]) {
	        // left arrow
	        if (this.velX > -this.speed) {
	            this.velX--;
	        }
	    }

	    this.velX *= friction;
	    this.velY += gravity;
	    this.grounded = false;

	    _this.x += _this.velX;
   		_this.y += _this.velY;
		},
		this.drawPlayer = function(ctx) {
			ctx.fillStyle = "red";
   			ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
		},
		this.init = function(gravity, friction, allSteps, allEnemies, ctx) {
			_this.movePlayer(gravity, friction);
		    _this.checkIfPlayerHitBox(allSteps);
		    _this.encounterWithEnemy(allEnemies);
		    _this.drawPlayer(ctx);
		}
}
}

