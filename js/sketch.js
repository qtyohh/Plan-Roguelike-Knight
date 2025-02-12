let game;
let mapp;
let main;
function setup() {
    createCanvas(1000, 950);
    main = new Main();
    main.initNewGame();
}

function draw() {
    background(220);
    main.updateAll();
}

function keyPressed() {
    main.keyPressed();
  }
  
  // 侦听键盘松开
function keyReleased() {
    main.keyReleased();
}