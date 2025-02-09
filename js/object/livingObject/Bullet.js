
const PLAYER_BULLET_TYPE = 0;
const ENEMY_BULLET_TYPE  = 1;
const BOSS_BULLET_TYPE   = 2;

class Bullet extends LivingObject {
    constructor(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType) {
        if (bulletType == PLAYER_BULLET_TYPE) {
            super(
                "bullet", 
                xCoordinate, 
                yCoordinate, 
                5, 
                5, 
                1, 
                10, 
                PLAYER_BULLET_ATTACK_BIT
            );
            this.harm = 1;
        } else if (bulletType == ENEMY_BULLET_TYPE) {
            super(
                "bullet", 
                xCoordinate, 
                yCoordinate, 
                2, 
                2, 
                1, 
                3, 
                ENEMY_BULLET_ATTACK_BIT
            );
            this.harm = 0.5;
        } else if (bulletType == BOSS_BULLET_TYPE) {
            super(
                "bullet", 
                xCoordinate, 
                yCoordinate, 
                3, 
                3, 
                1, 
                5, 
                ENEMY_BULLET_ATTACK_BIT
            );
            this.harm = 1;
        }
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.toDelete = false;
    }

    updateStatus() {
        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
    }

    show() {
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
}
