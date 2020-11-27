"use strict";

const example1 = $("#example1");
// const x = example1.getBoundingClientRect().x;
// const y = example1.getBoundingClientRect().y;
// const width = example1.getBoundingClientRect().width;
// const height = example1.getBoundingClientRect().height;

const objects = new InteractiveObjects("#example1");
objects.addRect(0, 0, 50, 50, 50, 50);
objects.addRect(100, 100, -40, -50, 50, 50);
objects.addRect(170, 170, -40, 0, 100, 50);
objects.addRect(700, 10, -80, 50, 30, 60);
objects.addRect(10, 170, 90, 0, 30, 50);
objects.addCir(300, 80, 80, -10, 20);
objects.addRect(250, 90, 0, 0, 50, 50);
objects.addCir(200, 0, -90, 90, 30);
objects.addCir(350, 20, 20, 10, 10);
objects.addCir(400, 120, -70, 30, 20);
objects.addCir(450, 90, 0, -90, 25);
