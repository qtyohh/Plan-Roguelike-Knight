class Main {
    #UI = null;
    #status = null;
    #game = null;

    constructor() {
        this.#UI = new UI();
        this.#status = new Status();
    }
    initNewGame() {
        this.#game = new Game();
        this.#game.initPlayer();
        this.#game.initEnemies();
        this.#game.initIslands();
        this.#game.initBuilding();
    }

    updateAll() {
        this.#game.updateObjectStatus();
    }

    keyPressed() {
        this.#game.playerController.keyPressed();
    }

    keyReleased() {
        this.#game.playerController.keyReleased();
    }

    callStartUI() {
        this.UI.startUI();
    }
    callChooseShipUI() {

    }
    callChooseModeUI() {

    }
    callChooseSeamanUI() {

    }
    callInfomationBoardInGameUI() {

    }
    callMenuBoardInGameUI() {

    }
}   