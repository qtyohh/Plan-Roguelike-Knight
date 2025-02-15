class Building extends BasicObject {
    constructor(xCoordinate, yCoordinate, modelType) {
        const buildingModel = getBuildingModel(modelType);
        super(
            buildingModel.name, 
            xCoordinate, 
            yCoordinate, 
            buildingModel.xSize, 
            buildingModel.ySize, 
            NO_HARM_ATTACK_BIT
        );
        this.HP = buildingModel.HP;
        this.isAlive = true;
    }
    show() {
        fill(255, 255, 255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

    updateHP(change) {
        if (this.isAlive) {
            this.HP += change;
            this.HP = constrain(this.HP, 0, this.buildingModel.HP);
            if (this.HP <= 0) {
                this.isAlive = false;
            }
        }
    }
}