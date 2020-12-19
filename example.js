"use strict";

// const example1 = $("#example1");
// const x = example1.getBoundingClientRect().x;
// const y = example1.getBoundingClientRect().y;
// const width = example1.getBoundingClientRect().width;
// const height = example1.getBoundingClientRect().height;

const example1 = new InteractiveObjects("#example1");
example1.addRect(0, 0, 100, 100, 80, 80);

const example2 = new InteractiveObjects("#example2");
example2.addRect(0, 0, 20, 100, 50, 50);
example2.addRect(100, 100, -100, -100, 50, 50);
example2.addRect(170, 170, -40, 0, 100, 50);
example2.addRect(700, 10, -80, 50, 30, 60);
example2.addRect(10, 170, 90, 0, 30, 50);
example2.addCir(300, 80, 80, -10, 20);
example2.addRect(250, 90, 0, 0, 50, 50);
example2.addCir(200, 0, -90, 90, 30);
example2.addCir(350, 20, 20, 10, 10);
example2.addCir(400, 120, -70, 30, 20);
example2.addCir(450, 90, 0, -90, 25);

const example3 = new InteractiveObjects("#example3", 0.8);
example3.addCir(550, 50, -150, 80, 50, 30);
example3.addCir(20, 300, 200, -90, 20);
example3.addCir(50, 250, 220, -80, 20);
example3.addCir(80, 350, 230, -100, 20);
example3.addCir(100, 200, 250, -70, 20);

const example4 = new InteractiveObjects("#example4", 0.6, true);
example4.addCir(15, 50, 0, 0, 20);
example4.addCir(60, 50, 0, 0, 20);
example4.addCir(105, 50, 0, 0, 20);
example4.addCir(150, 50, 0, 0, 20);
example4.addCir(195, 50, 0, 0, 20);
example4.addCir(240, 50, 0, 0, 20);
example4.addCir(285, 50, 0, 0, 20);
example4.addCir(330, 50, 0, 0, 20);
example4.addCir(375, 50, 0, 0, 20);
example4.addRect(120, 140, 0, 0, 80, 80, 40, "Blue");
