
var canvas,
	canvasBgColor = "rgb(0, 0, 0)",
	context,
	particles,
	particleColor = "rgb(220, 220, 220, 0.8)",
	particleDensity = 1000,
	motionBlur = true, //Motion blur effect on or off
	particleSize = 0.5,
	collisionDetection = false;//collision effect on or off, this may degrade performance after set to true

function initStars() {
	canvas = document.getElementById('header-canvas');
	canvas.style.backgroundColor = canvasBgColor;
	context = canvas.getContext('2d');
	particles = new Array();

	setBoundary();
	window.addEventListener("resize", setBoundary, true); //when window resize resize cavas as well

	//Create particles
	for (var i = 0; i < particleDensity; i++) {
		particles.push(new particle());
	}

	requestAnimationFrame(moveParticle);
}

function setBoundary() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function moveParticle() {
	if (motionBlur) {
		//motion effect is on
		context.fillStyle = "rgba(0, 0, 31,0.5)";
		context.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		//if motion blur effect is off
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	for (i = 0; i < particleDensity; i++) {
		particles[i].move();
	}

	if (collisionDetection) {
		for (var i = 0; i < particleDensity; i++) {
			for (var j = i + 1; j < particleDensity; j++) {
				particles[i].detectCollision(particles[j]);
			}
		}
	}

	requestAnimationFrame(moveParticle);
}

function randomIntFromInterval(min, max) { // min and max included 
	return Math.random() * (max - min + 1) + min;
  }

function particle() {
	const rand = randomIntFromInterval(0.5, 1.3);
	this.posX = Math.floor((Math.random() * window.innerWidth) + 1); //Current X position of a particle
	this.posY = Math.floor((Math.random() * window.innerHeight) + 1); //Current Y position of a particle
	this.speed = 0.2 * rand; 
	this.particleSize = particleSize * rand;
	this.velocityX = (Math.random() - 0.5) * this.speed; //x Direction
	this.velocityY = (Math.random() - 0.5) * this.speed; //Y direction
	this.color = particleColor;

	this.draw = function() {
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.posX, this.posY, this.particleSize, Math.PI * 4, false);
		context.fill();
	}

	this.move = function() {
		this.posX = (this.posX + this.velocityX);
		this.posY = (this.posY + this.velocityY);
		/*
		//if particle reached to max X
		if (this.posX >= (window.innerWidth - this.particleSize)) {
			this.velocityX *= -1;
		}
		//if particle reached to max y
		else if (this.posY >= (window.innerHeight - this.particleSize)) {
			this.velocityY *= -1;
		}
		//if particle reached to min x
		else if (this.posX <= this.particleSize) {
			this.velocityX *= -1;
		}
		//if particle reached to min y
		else if (this.posY <= this.particleSize) {
			this.velocityY *= -1;
		}
		*/

		this.draw();
	}

	this.findDistance = function(particle1) {
		//Finding distance between two particles
		//rootover diffrence between x cordinates and and y corndinates
		return Math.round(
			Math.sqrt(
				Math.pow(this.posX - particle1.posX, 2) +
				Math.pow(this.posY - particle1.posY, 2)
			)
		);
	}

	this.detectCollision = function(particle1) {

		var distance = this.findDistance(particle1);

		if ((distance <= 2 * this.particleSize)) {
			var x = this.velocityX;
			this.velocityX = particle1.velocityX;
			particle1.velocityX = x;
		}
	}
}

initStars();
