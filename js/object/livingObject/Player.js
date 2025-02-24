class Player extends BasicObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed) {
        super(
            name,
            PLAYER_TYPE,
            xCoordinate,
            yCoordinate,
            xSize,
            ySize,
            NO_HARM_ATTACK_BIT,
            HP,
            speed,
        );
        this.abilityCD = 0;
        this.equipment = new Equipment(name, 0, 0, 0, 0, 0, {});
        this.wavePushX = 0;
        this.wavePushY = 0;
    }

    show() {
        fill(255);
        super.show();
    }

    updateHP(change) {
        super.updateHP(change);
    }

    move(xSpeed, ySpeed) {
        let newX = this.xCoordinate + xSpeed * this.speed + this.wavePushX;
        let newY = this.yCoordinate + ySpeed * this.speed + this.wavePushY;

        newX = constrain(newX, this.xSize / 2, width - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, height - this.ySize / 2);

        this.xCoordinate = newX;
        this.yCoordinate = newY;

        this.wavePushX *= 0.95;
        this.wavePushY *= 0.95;
    }

    applyWaveForce(forceX, forceY) {
        this.wavePushX = this.wavePushX * 0.9 + forceX;
        this.wavePushY = this.wavePushY * 0.9 + forceY;
    }


    putOnBuff() {

    }
}