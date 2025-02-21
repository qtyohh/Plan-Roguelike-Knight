class Enemy extends BasicObject {
    constructor(xCoordinate, yCoordinate, enemyModelType, enemyAttackCallBack, enemyMoveCallBack) {
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
        this.attackRange = 200;
        this.seeRange = 500;
        this.enemyAttackCallBack = enemyAttackCallBack;
        this.enemyMoveCallBack = enemyMoveCallBack;
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

    enemyAI(playerX, playerY, enemy) {
        if (this.isAlive) {
            let distance = dist(this.xCoordinate, this.yCoordinate, playerX, playerY);
            if (distance > this.seeRange) {
            } else if (distance > this.attackRange && distance <= this.seeRange) {
                let xSpeed = (playerX - this.xCoordinate) / distance * this.speed;
                let ySpeed = (playerY - this.yCoordinate) / distance * this.speed;
                this.enemyMove(xSpeed, ySpeed, enemy);
            } else if (distance <= this.attackRange && millis() - this.lastAttackTime > this.attackCD * 1000) {
                let xSpeed = (playerX - this.xCoordinate) / distance;
                let ySpeed = (playerY - this.yCoordinate) / distance;
                this.enemyAttack(xSpeed, ySpeed);
            }
        }
    }

    enemyMove(xSpeed, ySpeed, enemy) {
        this.enemyMoveCallBack(xSpeed, ySpeed, enemy);
    }

    enemyAttack(xSpeed, ySpeed) {
        this.enemyAttackCallBack(
            xSpeed,
            ySpeed,
            this.xCoordinate,
            this.yCoordinate,
        );
        this.lastAttackTime = millis();
    }
}

