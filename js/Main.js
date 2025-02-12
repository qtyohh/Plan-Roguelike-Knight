
class Main {
    #UI = null;
    #status = null;
    #game = null;
    #step = MAIN_STEP_START_UI;

    constructor() {
        this.#UI = new UI(
            (stepChangeType) => this.updateStep(stepChangeType)
        );
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
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.showStartUI();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                if (this.#game == null) {
                    this.initNewGame();
                }
                this.#game.updateObjectStatus();
                break;
            }
        }
    }

    keyPressed() {
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIKeyPressed();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#game.playerController.keyPressed();
                break;
            }
        }
    }

    keyReleased() {
        this.#game.playerController.keyReleased();
    }

    updateStep(stepChangeType) {
        this.#step = stepChangeType;
    }

    callStartUI() {
        this.#UI.showStartUI();
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