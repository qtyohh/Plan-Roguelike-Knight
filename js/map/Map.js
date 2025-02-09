class Map {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
    }
    initMainMap() {
        createCanvas(this.xSize, this.ySize);
    }
}