class Explode {
    constructor(xCoor, yCoor, harm, attackBit, explodeType) {
        const explodeModel = getExplodeModel(explodeType);
        this.name = explodeModel.name
        this.xCoordinate = xCoor;
        this.yCoordinate = yCoor;
        this.xSize = explodeModel.xSize;
        this.ySize = explodeModel.ySize;
        this.harm = harm;
        this.attackBit = attackBit;
        this.type = explodeType;
    }

    show() {
        fill(0);
        let xCoor = this.xCoordinate - this.xSize / 2;
        let yCoor = this.yCoordinate - this.ySize / 2;
        rect(xCoor, yCoor, this.xSize, this.ySize);
    }
}