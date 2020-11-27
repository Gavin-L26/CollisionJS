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
		this.shape = "rect";
		this.width = width;
		this.height = height;
	}

	draw() {
		// Draw a simple rectangle
		this.context.fillStyle = this.isColliding ? "#FF5733" : "#57CA86"; //Change colour for better demostration
		this.context.fillRect(this.x, this.y, this.width, this.height);
	}

	update(secondsPassed) {
		// Update new position with the set velocity
		this.x += this.vx * secondsPassed;
		this.y += this.vy * secondsPassed;
	}
}

// A circle shaped moving object
class Circle extends MovingObject {
	constructor(context, x, y, vx, vy, radius) {
		super(context, x, y, vx, vy);
		this.radius = radius;
		this.shape = "cir";
	}

	draw() {
		// Draw a simple circle
		this.context.beginPath();
		this.context.fillStyle = this.isColliding ? "#FF5733" : "#57CA86"; //Change colour for better demostration
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.context.fill();
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

	addCir: function (x, y, vx, vy, radius) {
		const cir = new Circle(this.context, x, y, vx, vy, radius);
		this.movingObjects.push(cir);

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

				let overlap;

				if (obj1.shape == "rect") {
					if (obj2.shape == "rect") {
						overlap = this.overlapTwoRect(
							obj1.x,
							obj1.y,
							obj1.width,
							obj1.height,
							obj2.x,
							obj2.y,
							obj2.width,
							obj2.height
						);
					} else {
						overlap = this.overlapRectCir(
							obj1.x,
							obj1.y,
							obj1.width,
							obj1.height,
							obj2.x,
							obj2.y,
							obj2.radius
						);
					}
				} else {
					if (obj2.shape == "rect") {
						overlap = this.overlapRectCir(
							obj2.x,
							obj2.y,
							obj2.width,
							obj2.height,
							obj1.x,
							obj1.y,
							obj1.radius
						);
					} else {
						overlap = this.overlapTwoCir(
							obj1.x,
							obj1.y,
							obj1.radius,
							obj2.x,
							obj2.y,
							obj2.radius
						);
					}
				}

				if (overlap) {
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

	//Checks for two rectangles overlap
	overlapTwoRect: function (x1, y1, w1, h1, x2, y2, w2, h2) {
		// Check x and y for overlap
		if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
			return false;
		}

		return true;
	},

	//Checks for two circles overlap
	overlapTwoCir: function (x1, y1, r1, x2, y2, r2) {
		// distance between the two circles
		let d = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);

		// When the distance is smaller or equal to the sum
		// of the two radius, the circles overlap
		return d <= Math.pow(r1 + r2, 2);
	},

	//Checks for one rectangle and one circle overlap (1 is rect, 2 is cir)
	overlapRectCir: function (x1, y1, w1, h1, x2, y2, r2) {
		// x and y distance between the center of the circle
		// and the center of the rectangle
		const dx = Math.abs(x2 - x1 - w1 / 2);
		const dy = Math.abs(y2 - y1 - h1 / 2);

		//definately not overlapping
		if (dx > w1 / 2 + r2 || dy > h1 / 2 + r2) {
			return false;
		}

		//definately overlapping
		if (dx <= w1 / 2 || dy <= h1 / 2) {
			return true;
		}

		//check for overlapping corner
		const rx = dx - w1 / 2;
		const ry = dy - h1 / 2;

		return Math.pow(rx, 2) + Math.pow(ry, 2) <= Math.pow(r2, 2);
	},

	//Clean the canvas for every frame to redraw
	CleanCanvas: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};
