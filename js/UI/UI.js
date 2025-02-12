class UI {
    #startUI = {
        color1 : 50,
        color2 : 50,
        color3 : 50,
        xCoor : 0,
        yCoor : 0,
        xSize : 1000,
        ySize : 1000
    };
    constructor(updateStep) {
        this.updateStep = updateStep;
    }

    showStartUI() {
        fill(
            this.#startUI.color1,
            this.#startUI.color2,
            this.#startUI.color3
        );
        rect(
            this.#startUI.xCoor,
            this.#startUI.yCoor,
            this.#startUI.xSize,
            this.#startUI.ySize
        );
    }

    startUIKeyPressed() {
        if(key != null || keyCode != null) {
            this.updateStep(MAIN_STEP_IN_GAME);
        }
    }
}