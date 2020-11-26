"use strict";

window.onload = function () {
	const canvas = document.getElementById("canvas");
	const context = this.canvas.getContext("2d");
	let movingObjects = new InteractiveObjects(canvas, context);
	movingObjects.addRect(250, 50, 0, 50, 50, 50);
};

// [
// 	new Square(context, 250, 50, 0, 50),
// 	new Square(context, 250, 300, 0, -50),
// 	new Square(context, 150, 0, 50, 50),
// 	new Square(context, 250, 150, 50, 50),
// 	new Square(context, 350, 75, -50, 50),
// 	new Square(context, 300, 300, 50, -50),
// ];
