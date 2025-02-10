 class Island extends BasicObject {
    constructor(xCoordinate, yCoordinate, islandType) {
        const islandModel = getIslandModel(islandType);
        super(
            islandModel.name, 
            xCoordinate, 
            yCoordinate, 
            islandModel.xSize, 
            islandModel.ySize, 
            NO_HARM_ATTACK_BIT
        );
        this.type = islandModel.type;
    }

    show() {
        fill(255, 255, 255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
 }