
class Main {
    #UI = null;
    #status = null;
    #game = null;
    #step = MAIN_STEP_START_UI;

    constructor() {
        this.#UI = new UI(
            (stepChangeType) => this.updateStep(stepChangeType),
            (shipType) => this.setShipBasic(shipType)
        );
        this.#status = new Status();
    }
    initNewGame() {
        let playerBasicStatus = this.#status.getShipBasicStatus();
        this.#game = new Game(
            (stepChangeType) => this.updateStep(stepChangeType)
        );
        this.#game.initPlayer(playerBasicStatus);
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
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.showChooseShipUI();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                if (this.#game == null) {
                    this.initNewGame();
                }
                this.#game.updateObjectStatus();
                break;
            }
            case MAIN_STEP_GAME_REWARD: {
                //this.gameRewardUI();
                fill(0);
                rect(500, 500, 400, 400);
                fill(255);
                text("金币:填充填充", 500, 500);
                text("水手:填充填充", 500, 700);
            }   
        }
    }

    keyPressed() {
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIPressed();
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

    mousePressed() {
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIPressed();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.chooseShipUIMousePressed();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#game.playerController.mousePressed();
                break;
            }
        }
    }

    updateStep(stepChangeType) {
        this.#step = stepChangeType;
    }

    setShipBasic(shipType) {
        this.#status.setShipBasicStatus(shipType);
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