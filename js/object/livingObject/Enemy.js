class Enemy extends LivingObject {
    constructor(xCoordinate, yCoordinate, enemyModelType, enemyAttackCallBack) {
        const enemyModel = getEnemyModel(enemyModelType);
        super(
            enemyModel.name,
            xCoordinate,
            yCoordinate,
            enemyModel.xSize,
            enemyModel.ySize,
            enemyModel.HP,
            enemyModel.speed,
            ENEMY_ATTACK_BIT
        );
        this.type = enemyModel.type;
        this.maxHP = enemyModel.HP;

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
        if (this.isAlive) {
            this.HP += change;
            this.HP = constrain(this.HP, 0, this.maxHP);

            if (this.HP <= 0) {
                this.isAlive = false;
            }
        }
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

