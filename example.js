"use strict";

window.onload = function () {
	const canvas = document.getElementById("canvas");
	const context = this.canvas.getContext("2d");
	let movingObjects = new InteractiveObjects(canvas, context);
	movingObjects.addRect(250, 50, 50, 50, 50, 50);
	movingObjects.addRect(250, 250, 0, -80, 20, 80);
	movingObjects.addRect(250, 150, 40, 100, 60, 60);
	movingObjects.addRect(320, 260, 0, 0, 30, 50);
	movingObjects.addRect(260, 0, -30, 90, 70, 50);
	movingObjects.addRect(80, 60, 50, -50, 50, 50);
	movingObjects.addCir(450, 20, 30, 20, 10);
	movingObjects.addCir(550, 75, -70, 80, 50);
	movingObjects.addCir(700, 100, -30, 20, 40);
};
