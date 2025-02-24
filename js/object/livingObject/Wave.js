class Wave {
  constructor(edge) {
      this.speed = random(1, 5); //波浪速度
      this.edge = edge;
      this.hasDamaged = new Set();

      //波浪大小
      if (edge === "left" || edge === "right") {
          this.xSize = 70;
          this.ySize = 200;
      } else {
          this.xSize = 200;
          this.ySize = 70;
      }

      if (edge === "left") {
          this.xCoordinate = -this.xSize / 2;
          this.yCoordinate = random(this.ySize / 2, height - this.ySize / 2);
          this.vx = this.speed;
          this.vy = 0;
      } else if (edge === "right") {
          this.xCoordinate = width + this.xSize / 2;
          this.yCoordinate = random(this.ySize / 2, height - this.ySize / 2);
          this.vx = -this.speed;
          this.vy = 0;
      } else if (edge === "up") {
          this.xCoordinate = random(this.xSize / 2, width - this.xSize / 2);
          this.yCoordinate = -this.ySize / 2;
          this.vx = 0;
          this.vy = this.speed;
      } else if (edge === "down") {
          this.xCoordinate = random(this.xSize / 2, width - this.xSize / 2);
          this.yCoordinate = height + this.ySize / 2;
          this.vx = 0;
          this.vy = -this.speed;
      }

      this.finished = false;
  }

  updateStatus(islands = [], player, enemies) {
    // 移动波浪
    this.xCoordinate += this.vx;
    this.yCoordinate += this.vy;

    // 超出屏幕则结束
    if (
      this.xCoordinate - this.xSize / 2 > width ||
      this.xCoordinate + this.xSize / 2 < 0 ||
      this.yCoordinate - this.ySize / 2 > height ||
      this.yCoordinate + this.ySize / 2 < 0
    ) {
      this.finished = true;
      return;
    }

    // 波浪碰到岛屿时消失
    for (let island of islands) {
      if (myCollide(this, island)) {
        this.finished = true;
        return;
      }
    }

    // 计算推力（可根据需要调整）
    let pushForce = this.speed * 0.1;
    let pushX = this.vx * pushForce;
    let pushY = this.vy * pushForce;

    // 对玩家进行推力处理（先模拟新位置，再检测与岛和敌人碰撞）
    if (myCollide(this, player)) {
      let newPlayerPos = {
        xCoordinate: player.xCoordinate + pushX,
        yCoordinate: player.yCoordinate + pushY,
        xSize: player.xSize,
        ySize: player.ySize
      };
      let collisionDetected = false;
      // 检查与岛碰撞
      for (let island of islands) {
        if (myCollide(newPlayerPos, island)) {
          collisionDetected = true;
          break;
        }
      }
      // 检查与敌人碰撞
      if (!collisionDetected) {
        for (let enemy of enemies) {
          if (myCollide(newPlayerPos, enemy)) {
            collisionDetected = true;
            break;
          }
        }
      }
      if (collisionDetected) {
        // 新位置碰撞，取消这次波浪推力
        player.wavePushX = 0;
        player.wavePushY = 0;
      } else {
        player.applyWaveForce(pushX, pushY);
      }
    }

    // 对每个敌人进行推力处理（同样模拟新位置，检测与岛和玩家以及其他敌人的碰撞）
    for (let enemy of enemies) {
      if (myCollide(this, enemy)) {
        let newEnemyPos = {
          xCoordinate: enemy.xCoordinate + pushX,
          yCoordinate: enemy.yCoordinate + pushY,
          xSize: enemy.xSize,
          ySize: enemy.ySize
        };
        let collisionDetected = false;
        // 检查与岛碰撞
        for (let island of islands) {
          if (myCollide(newEnemyPos, island)) {
            collisionDetected = true;
            break;
          }
        }
        // 检查与玩家碰撞
        if (!collisionDetected && myCollide(newEnemyPos, player)) {
          collisionDetected = true;
        }
        // 检查与其他敌人碰撞（可选，根据需求决定是否需要避免敌人之间的重叠）
        if (!collisionDetected) {
          for (let otherEnemy of enemies) {
            if (otherEnemy !== enemy && myCollide(newEnemyPos, otherEnemy)) {
              collisionDetected = true;
              break;
            }
          }
        }
        if (collisionDetected) {
          enemy.wavePushX = 0;
          enemy.wavePushY = 0;
        } else {
          enemy.applyWaveForce(pushX, pushY);
        }
      }
    }
  }

  show() {
      noStroke();
      fill(0, 0, 255, 127);//蓝色-小波浪
      rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
  }
}

class BigWave {
  constructor(x, y, vx, vy) {
      this.xCoordinate = x;
      this.yCoordinate = y;
      this.vx = vx;
      this.vy = vy;
      this.speed = Math.sqrt(vx * vx + vy * vy);
      this.hasDamaged = new Set();

      //巨浪大小
      if (Math.abs(vx) > Math.abs(vy)) {
          this.xSize = 100;
          this.ySize = 300;
      } else {
          this.xSize = 300;
          this.ySize = 100;
      }

      this.finished = false;
  }

  updateStatus(islands = [], player, enemies) {
    // 移动波浪
    this.xCoordinate += this.vx;
    this.yCoordinate += this.vy;

    // 超出屏幕则结束
    if (
      this.xCoordinate - this.xSize / 2 > width ||
      this.xCoordinate + this.xSize / 2 < 0 ||
      this.yCoordinate - this.ySize / 2 > height ||
      this.yCoordinate + this.ySize / 2 < 0
    ) {
      this.finished = true;
      return;
    }

    // 波浪碰到岛屿时消失
    for (let island of islands) {
      if (myCollide(this, island)) {
        this.finished = true;
        return;
      }
    }

    // 计算推力（可根据需要调整）
    let pushForce = this.speed * 0.1;
    let pushX = this.vx * pushForce;
    let pushY = this.vy * pushForce;

    // 对玩家进行推力处理（先模拟新位置，再检测与岛和敌人碰撞）
    if (myCollide(this, player)) {
      let newPlayerPos = {
        xCoordinate: player.xCoordinate + pushX,
        yCoordinate: player.yCoordinate + pushY,
        xSize: player.xSize,
        ySize: player.ySize
      };
      let collisionDetected = false;
      // 检查与岛碰撞
      for (let island of islands) {
        if (myCollide(newPlayerPos, island)) {
          collisionDetected = true;
          break;
        }
      }
      // 检查与敌人碰撞
      if (!collisionDetected) {
        for (let enemy of enemies) {
          if (myCollide(newPlayerPos, enemy)) {
            collisionDetected = true;
            break;
          }
        }
      }
      if (collisionDetected) {
        // 新位置碰撞，取消这次波浪推力
        player.wavePushX = 0;
        player.wavePushY = 0;
      } else {
        player.applyWaveForce(pushX, pushY);
      }
    }

    // 对每个敌人进行推力处理（同样模拟新位置，检测与岛和玩家以及其他敌人的碰撞）
    for (let enemy of enemies) {
      if (myCollide(this, enemy)) {
        let newEnemyPos = {
          xCoordinate: enemy.xCoordinate + pushX,
          yCoordinate: enemy.yCoordinate + pushY,
          xSize: enemy.xSize,
          ySize: enemy.ySize
        };
        let collisionDetected = false;
        // 检查与岛碰撞
        for (let island of islands) {
          if (myCollide(newEnemyPos, island)) {
            collisionDetected = true;
            break;
          }
        }
        // 检查与玩家碰撞
        if (!collisionDetected && myCollide(newEnemyPos, player)) {
          collisionDetected = true;
        }
        // 检查与其他敌人碰撞（可选，根据需求决定是否需要避免敌人之间的重叠）
        if (!collisionDetected) {
          for (let otherEnemy of enemies) {
            if (otherEnemy !== enemy && myCollide(newEnemyPos, otherEnemy)) {
              collisionDetected = true;
              break;
            }
          }
        }
        if (collisionDetected) {
          enemy.wavePushX = 0;
          enemy.wavePushY = 0;
        } else {
          enemy.applyWaveForce(pushX, pushY);
        }
      }
    }
  }


  show() {
      noStroke();
      fill(255, 0, 0, 127);//红色-巨浪
      rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
  }
}

class WaveManager {
  constructor() {
      this.waves = [];
      this.lastWaveTime = 0;
      this.interval = 500; //波浪生成间隔
  }

  update(islands, player, enemies) {
    let waveCount = this.waves.length;
    if (waveCount < 20) {
        if (waveCount < 15 || (waveCount < 20 && random() < 0.5)) {
            if (millis() - this.lastWaveTime > this.interval) {
                this.generateWave();
                this.lastWaveTime = millis();
            }
        }
    }

    for (let i = this.waves.length - 1; i >= 0; i--) {
        let wave = this.waves[i];
        wave.updateStatus(islands, player, enemies);
        if (wave.finished) {
            console.log("波浪消失！");
            this.waves.splice(i, 1);
        }
    }

    this.checkWaveCollisions();
}

  show() {
      for (let wave of this.waves) {
          wave.show();
      }
  }

  generateWave() {
      const edges = ["left", "right", "up", "down"];
      let randomEdge = random(edges);
      let newWave = new Wave(randomEdge);
      this.waves.push(newWave);
  }

  checkWaveCollisions() {
      let wavesToRemove = new Set();
      let newWaves = [];

      for (let i = 0; i < this.waves.length; i++) {
          for (let j = i + 1; j < this.waves.length; j++) {
              let waveA = this.waves[i];
              let waveB = this.waves[j];

              if (myCollide(waveA, waveB)) {
                  let oppositeHorizontal = (waveA.vx > 0 && waveB.vx < 0) || (waveA.vx < 0 && waveB.vx > 0);
                  let oppositeVertical = (waveA.vy > 0 && waveB.vy < 0) || (waveA.vy < 0 && waveB.vy > 0);
                  let diagonalCollision =
                      (waveA.vx !== 0 && waveB.vy !== 0) || (waveA.vy !== 0 && waveB.vx !== 0);

                  let sameHorizontal = (waveA.vx > 0 && waveB.vx > 0) || (waveA.vx < 0 && waveB.vx < 0);
                  let sameVertical = (waveA.vy > 0 && waveB.vy > 0) || (waveA.vy < 0 && waveB.vy < 0);

                  if (oppositeHorizontal || oppositeVertical || diagonalCollision) {
                      wavesToRemove.add(i);
                      wavesToRemove.add(j);
                  } else if (sameHorizontal || sameVertical) {
                      let newX = (waveA.xCoordinate + waveB.xCoordinate) / 2;
                      let newY = (waveA.yCoordinate + waveB.yCoordinate) / 2;
                      let newVx = waveA.vx + waveB.vx;
                      let newVy = waveA.vy + waveB.vy;
                      let newWave = new BigWave(newX, newY, newVx, newVy);
                      newWaves.push(newWave);
                      wavesToRemove.add(i);
                      wavesToRemove.add(j);
                  }
              }
          }
      }

      this.waves = this.waves.filter((_, index) => !wavesToRemove.has(index));
      this.waves.push(...newWaves);
  }
}