class Enemy extends BasicObject {
    constructor(xCoordinate, yCoordinate, enemyModelType, enemyAttackCallBack) {
        const enemyModel = getEnemyModel(enemyModelType);
        super(
            enemyModel.name,
            ENEMY_TYPE,
            xCoordinate,
            yCoordinate,
            enemyModel.xSize,
            enemyModel.ySize,
            ENEMY_ATTACK_BIT,
            enemyModel.HP,
            enemyModel.speed,
        );
        this.modelType = enemyModel.type;

        this.attackCD = 1;
        this.lastAttackTime = 0;
        this.enemyAttackCallBack = enemyAttackCallBack;
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

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

    enemyAI(playerX, playerY) {
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);
            if (distance < 200 && millis() - this.lastAttackTime > this.attackCD * 1000) {
                this.lastAttackTime = millis();
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.enemyAttackCallBack(
                    xSpeed,
                    ySpeed,
                    ENEMY_BULLET_TYPE
                );
            }
        }
    }
}

