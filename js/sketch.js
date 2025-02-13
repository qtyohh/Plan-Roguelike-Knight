let main;

function setup() {
    createCanvas(1000, 1000);
    main = new Main();
}

function draw() {
    background(220);
    main.updateAll();
}

function keyPressed() {
    main.keyPressed();
  }

function mousePressed() {
    main.mousePressed();
}

  // 侦听键盘松开
function keyReleased() {
    main.keyReleased();
}