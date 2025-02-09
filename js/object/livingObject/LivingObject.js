class LivingObject extends BasicObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed, attackBit) {
        super(name, xCoordinate, yCoordinate, xSize, ySize, attackBit);
        this.HP = HP;
        this.speed = speed;
    }

    move(dirX, dirY) {
        this.xCoordinate += dirX * this.speed;
        this.yCoordinate += dirY * this.speed;
    }
}