class Enemy extends LivingObject {
    constructor(xCoordinate, yCoordinate, enemyModelType) {
        super(
            ENEMY_MODEL[enemyModelType].name,
            xCoordinate,
            yCoordinate,
            ENEMY_MODEL[enemyModelType].xSize,
            ENEMY_MODEL[enemyModelType].ySize,
            ENEMY_MODEL[enemyModelType].HP,
            ENEMY_MODEL[enemyModelType].speed,
            ENEMY_ATTACK_BIT
        );
        this.type = ENEMY_MODEL[enemyModelType].type;
        this.maxHP = ENEMY_MODEL[enemyModelType].HP;
    }

    show() {
        if (this.isAlive) {
            fill(100);
            rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
            
            let hpBar = this.xSize * (this.HP / this.maxHP);

            fill(220);
            rect(this.xCoordinate, this.yCoordinate - 10, this.xSize, 5);
            
            fill(255, 0, 0);
            rect(this.xCoordinate, this.yCoordinate - 10, hpBar, 5);
        }
    }

    updateHP(change) {
        if (this.isAlive) {
            this.HP += change;
            this.HP = constrain(this.HP, 0, this.maxHP);

            if (this.HP <= 0) {
                this.isAlive = false;
            }
        }
    }
    
}

