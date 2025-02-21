class Boss extends Enemy {
    constructor(xCoordinate, yCoordinate, enemyModelType) {
        const bossModel = getEnemyModel(enemyModelType);
        super(
            bossModel.name,
            xCoordinate,
            yCoordinate,
            bossModel.xSize,
            bossModel.ySize,
            bossModel.HP,
            bossModel.speed,
            ENEMY_ATTACK_BIT
        );
        this.type = enemyModel.type;
        this.maxHP = enemyModel.HP;
        this.abilityCD = 0;
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
        super.updateHP(change);
    }

    putOnBuff() {
       
    }
    
}

