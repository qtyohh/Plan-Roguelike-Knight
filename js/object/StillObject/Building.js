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
    }
    show() {
        fill(255, 255, 255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
    show() {
        fill(255, 255, 255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
}