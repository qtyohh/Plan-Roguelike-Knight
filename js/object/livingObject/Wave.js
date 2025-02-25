class Wave {
    constructor(x, y, vx, vy, type = "normal") {
        this.xCoordinate = x;
        this.yCoordinate = y;
        this.vx = vx;
        this.vy = vy;
        this.type = type;
        
        // 根据波浪类型设定不同参数
        if (this.type === "big") {
            this.xSize = 200;
            this.ySize = 150;
            this.pushForce = 0.3;
        } else {
            this.xSize = 150;
            this.ySize = 100;
            this.pushForce = 0.2;
        }
        
        this.speed = Math.sqrt(vx * vx + vy * vy);
        this.finished = false;
    }

    // 更新波浪状态，计算位置变化，并检测碰撞
    updateStatus(islands = [], player, enemies) {
        this.xCoordinate += this.vx;
        this.yCoordinate += this.vy;

        // 检查波浪是否超出屏幕边界
        if (
            this.xCoordinate - this.xSize / 2 > width ||
            this.xCoordinate + this.xSize / 2 < 0 ||
            this.yCoordinate - this.ySize / 2 > height ||
            this.yCoordinate + this.ySize / 2 < 0
        ) {
            this.finished = true;
            return;
        }

        // 检查波浪与岛屿的碰撞
        for (let island of islands) {
            if (myCollide(this, island)) {
                this.finished = true;
                return;
            }
        }

        // 计算推动力
        let pushX = this.vx * this.pushForce;
        let pushY = this.vy * this.pushForce;

        // 处理玩家与波浪的交互
        if (myCollide(this, player)) {
            player.applyWaveForce(pushX, pushY);
        }

        // 处理敌人与波浪的交互
        for (let enemy of enemies) {
            if (myCollide(this, enemy)) {
                enemy.applyWaveForce(pushX, pushY);
            }
        }
    }

    // 显示波浪
    show() {
        noStroke();
        fill(this.type === "big" ? [255, 0, 0, 127] : [0, 0, 255, 127]);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
}

class WaveManager {
    constructor() {
        this.waves = [];
        this.lastWaveTime = 0;
        this.interval = 100;
    }

    // 更新所有波浪状态，并检测是否需要生成新波浪
    update(islands, player, enemies) {
        if (this.waves.length < 1000 && millis() - this.lastWaveTime > this.interval) {
            this.generateWave();
            this.lastWaveTime = millis();
        }

        for (let i = this.waves.length - 1; i >= 0; i--) {
            let wave = this.waves[i];
            wave.updateStatus(islands, player, enemies);
            if (wave.finished) {
                this.waves.splice(i, 1);
            }
        }

        this.checkWaveCollisions();
    }

    // 显示所有波浪
    show() {
        for (let wave of this.waves) {
            wave.show();
        }
    }

    // 生成新的波浪，初始速度在1.5~4之间
    generateWave() {
        const edges = ["left", "right", "up", "down"];
        let randomEdge = random(edges);
        let x, y, vx, vy, speed = random(1.5, 4);
        

        
        if (randomEdge === "left") {
            x = -50;
            y = random(height);
            vx = speed;
            vy = 0;
        } else if (randomEdge === "right") {
            x = width + 50;
            y = random(height);
            vx = -speed;
            vy = 0;
        } else if (randomEdge === "up") {
            x = random(width);
            y = -50;
            vx = 0;
            vy = speed;
        } else {
            x = random(width);
            y = height + 50;
            vx = 0;
            vy = -speed;
        }

        let type = random() < 0.2 ? "big" : "normal";
        this.waves.push(new Wave(x, y, vx, vy, type));
    }

    // 检测波浪之间的碰撞并进行合并，速度累加，速度上限6，低于等于1.5则消除
    checkWaveCollisions() {
        let wavesToRemove = new Set();
        let newWaves = [];

        for (let i = 0; i < this.waves.length; i++) {
            for (let j = i + 1; j < this.waves.length; j++) {
                let waveA = this.waves[i];
                let waveB = this.waves[j];

                if (myCollide(waveA, waveB)) {
                    let newX = (waveA.xCoordinate + waveB.xCoordinate) / 2;
                    let newY = (waveA.yCoordinate + waveB.yCoordinate) / 2;
                    let newVx = constrain((waveA.vx + waveB.vx) / 2, -6, 6);
                    let newVy = constrain((waveA.vy + waveB.vy) / 2, -6, 6);
                    let newSpeed = Math.sqrt(newVx * newVx + newVy * newVy);
                    
                    if (newSpeed > 1.5) {
                        let newWave = new Wave(newX, newY, newVx, newVy, "big");
                        newWaves.push(newWave);
                    }
                    wavesToRemove.add(i);
                    wavesToRemove.add(j);
                }
            }
        }

        this.waves = this.waves.filter((_, index) => !wavesToRemove.has(index));
        this.waves.push(...newWaves);
    }
}

