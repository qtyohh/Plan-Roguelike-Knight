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
    }

    show() {
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

    
    updateHP(change) {
        this.HP += change;
    }
    
}

