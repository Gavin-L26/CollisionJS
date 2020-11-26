/* JS Libraries */
"use strict";

// A movable object
class MovingObject {
	constructor(context, x, y, vx, vy) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;

		this.isColliding = false;
	}
}

// A rectangle shaped moving object
class Rectangle extends MovingObject {
	constructor(context, x, y, vx, vy, width, height) {
		super(context, x, y, vx, vy);
		this.width = width;
		this.height = height;
	}

	draw() {
		// Draw a simple rectangle
		this.context.fillStyle = this.isColliding ? "#FF5733" : "#57CA86"; //For Changing colour
		this.context.fillRect(this.x, this.y, this.width, this.height);
	}

	update(secondsPassed) {
		// Update new position with the set velocity
		this.x += this.vx * secondsPassed;
		this.y += this.vy * secondsPassed;
	}
}

//Can be mapped to a canvas and control the movements of all movingobjects in it
function InteractiveObjects(canvas, context) {
	this.canvas = canvas;
	this.context = context;
	this.oldTimeStamp = 0;
	this.movingObjects = [];
}

InteractiveObjects.prototype = {
	//Add a new rectangle to the canvas at the given position with given dimension and given velocity
	addRect: function (x, y, vx, vy, width, height) {
		const rect = new Rectangle(this.context, x, y, vx, vy, width, height);
		this.movingObjects.push(rect);

		window.requestAnimationFrame((timeStamp) => {
			this.frameLoop(timeStamp);
		});
	},

	//A loop that is reruns for every frame
	frameLoop: function (timeStamp) {
		// Calculate how much time has passed
		let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
		this.oldTimeStamp = timeStamp;

		// Loop over all game objects to update
		for (let i = 0; i < this.movingObjects.length; i++) {
			this.movingObjects[i].update(secondsPassed);
		}

		this.detectCollisions();

		this.CleanCanvas();

		// Loop over all game objects to draw
		for (let i = 0; i < this.movingObjects.length; i++) {
			this.movingObjects[i].draw();
		}

		// The loop function has reached it's end
		// Keep requesting new frames
		window.requestAnimationFrame((timeStamp) => this.frameLoop(timeStamp));
	},

	//Detect the collision between any two movingObjects in the canvas
	detectCollisions: function () {
		let obj1;
		let obj2;

		for (let i = 0; i < this.movingObjects.length; i++) {
			this.movingObjects[i].isColliding = false;
		}

		for (let i = 0; i < this.movingObjects.length; i++) {
			obj1 = this.movingObjects[i];
			for (let j = i + 1; j < this.movingObjects.length; j++) {
				obj2 = this.movingObjects[j];

				if (
					this.overlapRect(
						obj1.x,
						obj1.y,
						obj1.width,
						obj1.height,
						obj2.x,
						obj2.y,
						obj2.width,
						obj2.height
					)
				) {
					obj1.isColliding = true;
					obj2.isColliding = true;

					let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
					let distance = Math.sqrt(
						(obj2.x - obj1.x) * (obj2.x - obj1.x) +
							(obj2.y - obj1.y) * (obj2.y - obj1.y)
					);
					let vCollisionNorm = {
						x: vCollision.x / distance,
						y: vCollision.y / distance,
					};
					let vRelativeVelocity = {
						x: obj1.vx - obj2.vx,
						y: obj1.vy - obj2.vy,
					};
					let speed =
						vRelativeVelocity.x * vCollisionNorm.x +
						vRelativeVelocity.y * vCollisionNorm.y;

					if (speed < 0) {
						break;
					}

					obj1.vx -= speed * vCollisionNorm.x;
					obj1.vy -= speed * vCollisionNorm.y;
					obj2.vx += speed * vCollisionNorm.x;
					obj2.vy += speed * vCollisionNorm.y;
				}
			}
		}
	},

	//Checks for rectangel overlap
	overlapRect: function (x1, y1, w1, h1, x2, y2, w2, h2) {
		// Check x and y for overlap
		if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
			return false;
		}

		return true;
	},

	//Clean the canvas for every frame to redraw
	CleanCanvas: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};
