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
        this.type = buildingModel.type;
        this.isAlive = true;
    }
    show() {
        fill(255, 255, 255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

    updateHP(change) {
        this.HP += change;
        if (this.HP <= 0) {
            this.isAlive = false;
        }
    }

    deadRattle() {
        switch(this.type) {
            case BUILDING_MODEL_TNT_TYPE: {
                this.explore();
                break;
            }
        }
    }

    explore() {

    }



}