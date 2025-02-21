class Wave {
  constructor(edge) {
      this.speed = random(1, 4); // 波浪速度
      this.edge = edge;

      // **波浪尺寸**
      if (edge === "left" || edge === "right") {
          this.xSize = 70;
          this.ySize = 200;
      } else {
          this.xSize = 200;
          this.ySize = 70;
      }

      // **初始化波浪中心坐标**
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

  updateStatus() {
      this.xCoordinate += this.vx;
      this.yCoordinate += this.vy;

      // **检查是否超出边界**
      if (this.edge === "left" && this.xCoordinate - this.xSize / 2 > width) {
          this.finished = true;
      } else if (this.edge === "right" && (this.xCoordinate + this.xSize / 2) < 0) {
          this.finished = true;
      } else if (this.edge === "up" && this.yCoordinate - this.ySize / 2 > height) {
          this.finished = true;
      } else if (this.edge === "down" && (this.yCoordinate + this.ySize / 2) < 0) {
          this.finished = true;
      }
  }

  show() {
      noStroke();
      fill(0, 0, 255, 127);
      rect(this.xCoordinate - this.xSize / 2, this.yCoordinate - this.ySize / 2, this.xSize, this.ySize);
  }
}

  
class WaveManager {
  constructor() {
      this.waves = [];
      this.lastWaveTime = 0;
      this.interval = 100; // 波浪生成间隔
  }

  update() {
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
        wave.updateStatus();
        if (wave.finished) {
            this.waves.splice(i, 1);
        }
    }

    // **检测波浪碰撞**
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
    for (let i = this.waves.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            let waveA = this.waves[i];
            let waveB = this.waves[j];

            // **检测是否有碰撞**
            if (myCollide(waveA, waveB)) {

                // **情况1：左右对向波浪（→ ←）**
                let horizontalOpposite = (waveA.vx > 0 && waveB.vx < 0) || (waveA.vx < 0 && waveB.vx > 0);

                // **情况2：上下对向波浪（↑ ↓）**
                let verticalOpposite = (waveA.vy > 0 && waveB.vy < 0) || (waveA.vy < 0 && waveB.vy > 0);

                // **情况3：交叉碰撞（左→ + 下↓） 或 （右← + 上↑）**
                let diagonalCollision = 
                    (waveA.vx > 0 && waveB.vy > 0) || (waveA.vy > 0 && waveB.vx > 0) || 
                    (waveA.vx < 0 && waveB.vy < 0) || (waveA.vy < 0 && waveB.vx < 0);

                // **如果满足任意一种情况，就删除波浪**
                if (horizontalOpposite || verticalOpposite || diagonalCollision) {
                    this.waves.splice(i, 1);
                    this.waves.splice(j, 1);
                    return;  // 删除一对后立即返回，防止索引错乱
                }
            }
        }
    }
}
}
