
const PLAYER_BULLET_TYPE = 0;
const ENEMY_BULLET_TYPE  = 1;
const BOSS_BULLET_TYPE   = 2;

class Bullet extends LivingObject {
    constructor(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType, attackPower, explosionSize, size, speed) {
        if (bulletType == PLAYER_BULLET_TYPE) {
            super(
                "bullet", 
                xCoordinate, 
                yCoordinate, 
                size, // bullet size
                size, 
                1, 
                speed, 
                PLAYER_BULLET_ATTACK_BIT
            );
            this.harm = attackPower;
            this.explosionSize = explosionSize;
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
            this.explosionSize = 1;
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
            this.explosionSize = 2;
        }
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.toDelete = false;
        this.exploded = false;
    }

    updateStatus() {
        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
    }

    show() {
        fill(0, 255, 0);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

    explode() {
        if (!this.exploded) {
            fill(0);
            rect(
                this.xCoordinate - this.explosionSize / 2, 
                this.yCoordinate - this.explosionSize / 2, 
                this.xSize + this.explosionSize, 
                this.ySize + this.explosionSize
            );
            this.exploded = true;
            console.log("---------Bullet exploded---------");
        }
    }
}
