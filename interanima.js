/* JS Libraries */
"use strict";

// A movable object
class MovingObject {
	constructor(element, x, y, vx, vy) {
		this.element = element;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;

		this.isColliding = false;
	}
}

// A rectangle shaped moving object
class Rectangle extends MovingObject {
	constructor(element, x, y, vx, vy, width, height) {
		super(element, x, y, vx, vy);
		this.width = width;
		this.height = height;
		this.shape = "rect";
	}

	draw() {
		// Draw a simple rectangle
		this.element.style.backgroundColor = this.isColliding
			? "#FF5733"
			: "#57CA86"; //Change colour for better demostration
	}

	update(secondsPassed) {
		// Update new position with the set velocity
		this.x += this.vx * secondsPassed;
		this.y += this.vy * secondsPassed;

		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	}
}

// A circle shaped moving object
class Circle extends MovingObject {
	constructor(element, x, y, vx, vy, radius) {
		super(element, x, y, vx, vy);
		this.radius = radius;
		this.shape = "cir";
	}

	draw() {
		// Draw a simple circle
		this.element.style.backgroundColor = this.isColliding
			? "#FF5733"
			: "#57CA86"; //Change colour for better demostration
	}

	update(secondsPassed) {
		// Update new position with the set velocity
		this.x += this.vx * secondsPassed;
		this.y += this.vy * secondsPassed;

		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	}
}

//Can be mapped to a canvas and control the movements of all movingobjects in it
function InteractiveObjects(parentId) {
	this.parentId = parentId;
	this.oldTimeStamp = 0;
	this.movingObjects = [];
}

InteractiveObjects.prototype = {
	//Add a new rectangle to the canvas at the given position with given dimension and given velocity
	addRect: function (x, y, vx, vy, width, height) {
		const rectElement = document.createElement("div");
		rectElement.style = `position: absolute; left: ${x}px; top:${y}px; width: ${width}px; height: ${height}px; background-color: Aqua;`;
		const rect = new Rectangle(rectElement, x, y, vx, vy, width, height);
		this.movingObjects.push(rect);
		const parent = $(this.parentId);
		parent.append(rectElement);

		window.requestAnimationFrame((timeStamp) => {
			this.frameLoop(timeStamp);
		});
	},

	addCir: function (x, y, vx, vy, radius) {
		const cirElement = document.createElement("div");
		cirElement.style = `position: absolute; left: ${x}px; top:${y}px; width: ${
			radius * 2
		}px; height: ${radius * 2}px; border-radius: 50%; background-color: Aqua;`;
		const cir = new Circle(cirElement, x, y, vx, vy, radius);
		this.movingObjects.push(cir);
		const parent = $(this.parentId);
		parent.append(cirElement);

		window.requestAnimationFrame((timeStamp) => {
			this.frameLoop(timeStamp);
		});
	},

	//A loop that is reruns for every frame
	frameLoop: function (timeStamp) {
		// Calculate time passed
		let secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
		this.oldTimeStamp = timeStamp;

		// update all movingObjects
		for (let i = 0; i < this.movingObjects.length; i++) {
			this.movingObjects[i].update(secondsPassed);
		}

		// Check collisions
		this.detectEdgeCollisions();
		this.detectCollisions();

		// Redraw objects
		for (let i = 0; i < this.movingObjects.length; i++) {
			this.movingObjects[i].draw();
		}

		window.requestAnimationFrame((timeStamp) => this.frameLoop(timeStamp));
	},

	//Detect whether an object has touched the edge of the canvas
	detectEdgeCollisions: function () {
		for (let i = 0; i < this.movingObjects.length; i++) {
			this.movingObjects[i].isColliding = false;
		}

		for (let i = 0; i < this.movingObjects.length; i++) {
			const obj = this.movingObjects[i];
			let overlap;

			//Check overlap
			if (obj.shape == "rect") {
				overlap = this.overlapRectEdge(obj.x, obj.y, obj.width, obj.height);
			} else {
				overlap = this.overlapCirEdge(obj.x, obj.y, obj.radius);
			}

			// change velocity
			if (overlap != 0) {
				obj.isColliding = true;

				if (overlap == 1) {
					const oldvx = obj.vx;
					obj.vx = 0 - oldvx;
				}

				if (overlap == 2) {
					const oldvy = obj.vy;
					obj.vy = 0 - oldvy;
				}
			}
		}
	},

	// //Detect whether an object has touched the mouse
	// detectMouseCollisions: function () {
	// 	for (let i = 0; i < this.movingObjects.length; i++) {
	// 		this.movingObjects[i].isColliding = false;
	// 	}

	// 	for (let i = 0; i < this.movingObjects.length; i++) {
	// 		let obj = this.movingObjects[i];
	// 		let overlap;

	// 		//Check overlap
	// 		if (obj.shape == "rect") {
	// 			overlap = this.overlapRectEdge(obj.x, obj.y, obj.width, obj.height);
	// 		} else {
	// 			overlap = this.overlapCirEdge(obj.x, obj.y, obj.radius);
	// 		}

	// 		// change velocity
	// 		if (overlap != 0) {
	// 			obj.isColliding = true;

	// 			if (overlap == 1) {
	// 				obj.vx = -obj.vx;
	// 			}

	// 			if (overlap == 2) {
	// 				obj.vy = -obj.vy;
	// 			}
	// 		}
	// 	}
	// },

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

	//Checks for a rectangle overlapping an edge of the parent
	overlapRectEdge: function (x, y, w, h) {
		const position = $(this.parentId).position();
		const parentWidth = $(this.parentId).width();
		const parentHeight = $(this.parentId).height();

		if (x <= position.left || x + w >= position.left + parentWidth) {
			return 1;
		}
		if (y <= position.top || y + h >= position.top + parentHeight) {
			return 2;
		}
		return 0;
	},

	//Checks for a circle overlapping an edge of the canvas
	overlapCirEdge: function (x, y, r) {
		const position = $(this.parentId).position();
		const parentWidth = $(this.parentId).width();
		const parentHeight = $(this.parentId).height();

		if (x <= position.left || x + 2 * r >= position.left + parentWidth) {
			return 1;
		}
		if (y <= position.top || y + 2 * r >= position.top + parentHeight) {
			return 2;
		}
		return 0;
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
		const dx = Math.abs(x2 + r2 - x1 - w1 / 2);
		const dy = Math.abs(y2 + r2 - y1 - h1 / 2);

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
};
