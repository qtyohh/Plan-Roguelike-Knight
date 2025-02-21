class Wave {
  constructor(edge) {
      this.speed = 0.5;
      this.edge = edge;

      // 根据出现边缘设置固定尺寸
      if (edge === "left" || edge === "right") {
          this.xSize = 30;  // 竖直长方形（窄宽，高度较大）
          this.ySize = 100;
      } else {
          this.xSize = 100; // 水平长方形（宽度较大，低高度）
          this.ySize = 30;
      }

      // 根据所选边界设置初始位置和运动方向
      if (edge === "left") {
          this.xCoordinate = -this.xSize;
          this.yCoordinate = random(0, height - this.ySize);
          this.vx = this.speed;
          this.vy = 0;
      } else if (edge === "right") {
          this.xCoordinate = width;
          this.yCoordinate = random(0, height - this.ySize);
          this.vx = -this.speed;
          this.vy = 0;
      } else if (edge === "up") {
          this.xCoordinate = random(0, width - this.xSize);
          this.yCoordinate = -this.ySize;
          this.vx = 0;
          this.vy = this.speed;
      } else if (edge === "down") {
          this.xCoordinate = random(0, width - this.xSize);
          this.yCoordinate = height;
          this.vx = 0;
          this.vy = -this.speed;
      }
      
      this.finished = false;
  }
  
  updateStatus() {
      this.xCoordinate += this.vx;
      this.yCoordinate += this.vy;
      
      // 当波浪完全离开画布时标记为完成
      if (this.edge === "left" && this.xCoordinate > width) {
          this.finished = true;
      } else if (this.edge === "right" && (this.xCoordinate + this.xSize) < 0) {
          this.finished = true;
      } else if (this.edge === "up" && this.yCoordinate > height) {
          this.finished = true;
      } else if (this.edge === "down" && (this.yCoordinate + this.ySize) < 0) {
          this.finished = true;
      }
  }
  
  show() {
      noStroke();
      fill(0, 0, 255, 127); // 半透明蓝色
      rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
  }
}

  
  class WaveManager {
    constructor() {
      this.waves = [];
      this.lastWaveTime = 0;
      this.interval = 5000; // 每5秒生成一个波浪
    }
    
    update() {
      // 判断是否需要生成新的波浪
      if (millis() - this.lastWaveTime > this.interval) {
        this.generateWave();
        this.lastWaveTime = millis();
      }
      
      // 更新所有波浪
      for (let i = this.waves.length - 1; i >= 0; i--) {
        let wave = this.waves[i];
        wave.updateStatus();
        if (wave.finished) {
          this.waves.splice(i, 1);
        }
      }
    }
    
    show() {
      for (let wave of this.waves) {
        wave.show();
      }
    }
    
    generateWave() {
      // 从四个边中随机选取一个边界
      const edges = ["left", "right", "up", "down"];
      let randomEdge = random(edges);
      let newWave = new Wave(randomEdge);
      this.waves.push(newWave);
    }
  }

  