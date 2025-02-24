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

        this.attackPower = enemyModel.attackPower;
        this.attackCD = enemyModel.attackCD;
        this.lastAttackTime = 0;
        this.attackRange = enemyModel.attackRange;
        this.seeRange = enemyModel.seeRange;
        this.enemyAttackCallBack = enemyAttackCallBack;
        this.enemyMoveCallBack = enemyMoveCallBack;
        this.lastCollideTime = 0;
        this.wavePushX = 0;
        this.wavePushY = 0;
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
        let newX = this.xCoordinate + xSpeed * this.speed + this.wavePushX;
        let newY = this.yCoordinate + ySpeed * this.speed + this.wavePushY;

        // 限制敌人不会超出画布范围（假设画布大小为 width 和 height）
    newX = constrain(newX, this.xSize / 2, width - this.xSize / 2);
    newY = constrain(newY, this.ySize / 2, height - this.ySize / 2);
        this.xCoordinate = newX;
        this.yCoordinate = newY;
        // 推力逐渐衰减
        this.wavePushX *= 0.95;
        this.wavePushY *= 0.95;
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
            this.attackPower
        );
        this.lastAttackTime = millis();
    }

      // ★ 新增：专门更新波浪推力
  updateWavePush() {
    // 将波浪推力加到敌人当前位置
    this.xCoordinate += this.wavePushX;
    this.yCoordinate += this.wavePushY;

    // 限制边界
    this.xCoordinate = constrain(this.xCoordinate, this.xSize / 2, width - this.xSize / 2);
    this.yCoordinate = constrain(this.yCoordinate, this.ySize / 2, height - this.ySize / 2);

    // 每帧衰减推力
    this.wavePushX *= 0.95;
    this.wavePushY *= 0.95;
  }

      // 添加供波浪调用的推力方法
      applyWaveForce(forceX, forceY) {
        this.wavePushX = this.wavePushX * 0.9 + forceX;
        this.wavePushY = this.wavePushY * 0.9 + forceY;
      }

}

