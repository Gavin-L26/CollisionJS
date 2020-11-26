"use strict";

window.onload = function () {
	const canvas = document.getElementById("canvas");
	const context = this.canvas.getContext("2d");
	let movingObjects = new InteractiveObjects(canvas, context);
	movingObjects.addRect(250, 50, 50, 50, 50, 50);
	movingObjects.addRect(250, 250, 0, -80, 20, 80);
	movingObjects.addRect(150, 20, 30, 20, 40, 10);
	movingObjects.addRect(250, 150, 40, 100, 60, 60);
	movingObjects.addRect(350, 75, -70, 80, 30, 80);
	movingObjects.addRect(320, 360, 60, -30, 20, 50);
	movingObjects.addRect(200, 100, 0, 0, 40, 40);
	movingObjects.addRect(260, 0, -30, 90, 70, 50);
	movingObjects.addRect(80, 60, 50, -50, 50, 50);
};
