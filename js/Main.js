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
        let playerBasicStatus = this.#status.getShipStatus();
        this.#game = new Game(
            (stepChangeType) => this.updateStep(stepChangeType)
        );
        this.#game.initPlayer(playerBasicStatus);
        this.#game.initEnemies();
        this.#game.initIslands();
        this.#game.initBuilding();
    }

    continueGame() {
        if (this.#game == null) {
            this.initNewGame();
        }
        this.#game.updateObjectStatus();
        this.updatePlayerStatus();

        // check if game is ended
        if (this.#game.getGameWin()) {
            this.updateStep(MAIN_STEP_GAME_REWARD);
            this.#game = null;
        } else if (this.#game.getGameOver()) {
            console.log("Game Over!");
            this.updateStep(MAIN_STEP_GAME_OVER);
            this.#game = null;
        }
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
                this.#UI.showInGameUI(this.#status.getShipStatus());
                this.continueGame();
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
                // this.#UI.startUIPressed();
                break;
            }
            case MAIN_STEP_IN_GAME: {
                this.#game.getPlayerController().keyPressed();
                break;
            }
        }
    }

    keyReleased() {
        switch (this.#step) {
            case MAIN_STEP_START_UI: {
                break;
            }
            case MAIN_STEP_IN_GAME: {
                if (this.#game) {
                    this.#game.getPlayerController().keyReleased();
                }
                break;
            }
        
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
                this.#game.getPlayerController().mousePressed();
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
    
    updatePlayerStatus() {
        const playerStatus = this.#game.getPlayerStatus();
        this.#status.HP = playerStatus.HP;
    }

    updateStep(stepChangeType) {
        if (stepChangeType >= MAIN_STEP_MAX || stepChangeType < 0) {
            console.log("step type error");
            stepChangeType = MAIN_STEP_MAX;
        }
        this.#step = stepChangeType;
        this.#UI.changeCurrentStep(stepChangeType);
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