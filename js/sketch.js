let game;
let mapp;
function setup() {
    mapp = new Map(600, 400);
    mapp.initMainMap();
    game = new Game();
    game.initPlayer();
    game.initEnemies();
}

function draw() {
    background(220);
    game.updateObjectStatus();
}

function keyPressed() {
    game.playerController.keyPressed();
  }
  
  // 侦听键盘松开
function keyReleased() {
    game.playerController.keyReleased();
}