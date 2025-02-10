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
    }
}