class Main {
    #UI = null;
    #status = null;
    #game = null;
    #step = MAIN_STEP_START_UI;

    constructor() {
        this.#UI = new MainUI(
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

    windowResized() {
        this.#UI.windowResized();
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
        if (this.#step === MAIN_STEP_IN_GAME && this.#game) {
            this.#game.playerController.keyReleased();
        }
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

    mouseReleased() {
        switch(this.#step) {
            case MAIN_STEP_START_UI: {
                this.#UI.startUIReleased();
                break;
            }
            case MAIN_STEP_CHOOSE_SHIP_UI: {
                this.#UI.chooseShipUIMouseReleased();
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