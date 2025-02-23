class MainUI {
  
    #currentStep = MAIN_STEP_START_UI;
    #startUI;
    #chooseShipUI;
    #inGameUI;
    #gameRewardUI;
  
    constructor(updateStep, updateShipStatus, updateBuffStatus) {
        this.updateStep = updateStep;
        this.updateShipStatus = updateShipStatus;
        this.updateBuffStatus = updateBuffStatus;
        
        // Init UI
        this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        this.#inGameUI = new InGameUI();
        this.#inGameUI.preload();
        this.#gameRewardUI = new GameRewardUI();
    }
  
    showStartUI() {
        if (!this.#startUI) {
            this.#startUI = new StartUI(this.#handleStartUIButtonClick.bind(this));
        }
        this.#startUI.init();
        this.#startUI.draw();
    }
  
    showChooseShipUI() {
        if (!this.#chooseShipUI) {
            this.#chooseShipUI = new ChooseShipUI(this.#handleShipSelection.bind(this));
        }
        this.#currentStep = MAIN_STEP_CHOOSE_SHIP_UI;
        this.#chooseShipUI.init();
        this.#chooseShipUI.draw();
    }
  
    showInGameUI(playerStatus) {
        if (this.#inGameUI == null) {
            this.#inGameUI = new InGameUI();
        }
        this.#inGameUI.update(playerStatus);
        this.#inGameUI.show(playerStatus);
    }

    showGameRewardUI(gold, buff) {
        if (this.#gameRewardUI == null) {
            this.#gameRewardUI = new GameRewardUI();
        }
        this.#gameRewardUI.init(buff);
        this.#gameRewardUI.draw(gold);
    }

    gameFinishGetSeamanUI() {
      // ...
    }
  
    startUIPressed() {
        if (this.#currentStep == MAIN_STEP_START_UI && this.#startUI) {
            this.#startUI.handleMousePressed();
        }
    }
      
    startUIReleased() {
        if (this.#currentStep == MAIN_STEP_START_UI && this.#startUI) {
            this.#startUI.handleMouseReleased();
        }
    }
    
    chooseShipUIMousePressed() {
        if (this.#currentStep == MAIN_STEP_CHOOSE_SHIP_UI && this.#chooseShipUI) {
            this.#chooseShipUI.handleMousePressed();
        }
    }
      
    chooseShipUIMouseReleased() {
        if (this.#currentStep == MAIN_STEP_CHOOSE_SHIP_UI && this.#chooseShipUI) {
            this.#chooseShipUI.handleMouseReleased();
        }
    }
    
    windowResized() {
        switch (this.#currentStep) {
            case MAIN_STEP_START_UI:
                if (this.#startUI) {
                    this.#startUI.handleWindowResized();
                }
                break;
            case MAIN_STEP_CHOOSE_SHIP_UI:
                if (this.#chooseShipUI) {
                    this.#chooseShipUI.handleWindowResized();
                }
                break;
        }
    }
    
    // // Handle current UI state mouse pressed
    // handleMousePressed() {
    //     switch (this.#currentStep) {
    //         case MAIN_STEP_START_UI:
    //             this.startUIPressed();
    //             break;
    //         case MAIN_STEP_CHOOSE_SHIP_UI:
    //             this.chooseShipUIMousePressed();
    //             break;
    //     }
    // }
  
    // // Handle current UI state mouse released
    // handleMouseReleased() {
    //     switch (this.#currentStep) {
    //         case MAIN_STEP_START_UI:
    //             this.startUIReleased();
    //             break;
    //         case MAIN_STEP_CHOOSE_SHIP_UI:
    //             this.chooseShipUIMouseReleased();
    //             break;
    //     }
    // }
  
    // private, callback by StartUI
    #handleStartUIButtonClick(buttonType) {
        if (buttonType == MAIN_STEP_START_UI) {
            // PLAN ROGUELIKE KNIGHT
            this.updateStep(MAIN_STEP_CHOOSE_SHIP_UI);
            this.showChooseShipUI();
        } else if (buttonType == MAIN_STEP_START_UI_TEAM) {
            // Team Overview
        }
    }
  
    // private, callback by ChooseShipUI
    #handleShipSelection(shipType) {
        if (this.updateShipStatus) {
            this.updateShipStatus(shipType);
        }
        
        if (this.updateStep) {
            this.updateStep(MAIN_STEP_IN_GAME);
        }
    }

    changeCurrentStep(step) {
        this.#currentStep = step;
    }
}
