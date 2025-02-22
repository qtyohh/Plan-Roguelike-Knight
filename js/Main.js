class Main {
    #UI = null;
    #status = null;
    #game = null;
    #step = MAIN_STEP_START_UI;
    #cursorPos = null;

    constructor() {
        this.#UI = new MainUI(
            (stepChangeType) => this.updateStep(stepChangeType),
            (shipType) => this.setShipBasic(shipType)
        );
        this.#status = new Status();
        this.#cursorPos = new CursorPos();
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
            return;
        }
        if (this.#game.gameOver) {
            console.log("Game Over!");
            this.updateStep(MAIN_STEP_GAME_OVER);
            this.#game = null;
            return;
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
                this.#UI.showGameRewardUI();
                break;
            }   
        }

        if (this.#step != MAIN_STEP_IN_GAME) {
            this.#cursorPos.show();
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
        this.#status.updateHP(playerStatus.HP);
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