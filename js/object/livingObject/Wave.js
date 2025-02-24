class Wave {
    constructor(edgeOrX, yOrVx, vxOrVy, vy, isBigWave = false) {
        this.isBigWave = isBigWave;
        this.hasDamaged = new Set();
        this.finished = false;

        if (typeof edgeOrX == "string") {
            this.speed = random(1, 5);
            this.edge = edgeOrX;

            if (edgeOrX == "left" || edgeOrX === "right") {
                this.xSize = 70;
                this.ySize = 200;
            } else {
                this.xSize = 200;
                this.ySize = 70;
            }

            if (edgeOrX == "left") {
                this.xCoordinate = -this.xSize / 2;
                this.yCoordinate = random(this.ySize / 2, height - this.ySize / 2);
                this.vx = this.speed;
                this.vy = 0;
            } else if (edgeOrX == "right") {
                this.xCoordinate = width + this.xSize / 2;
                this.yCoordinate = random(this.ySize / 2, height - this.ySize / 2);
                this.vx = -this.speed;
                this.vy = 0;
            } else if (edgeOrX == "up") {
                this.xCoordinate = random(this.xSize / 2, width - this.xSize / 2);
                this.yCoordinate = -this.ySize / 2;
                this.vx = 0;
                this.vy = this.speed;
            } else if (edgeOrX == "down") {
                this.xCoordinate = random(this.xSize / 2, width - this.xSize / 2);
                this.yCoordinate = height + this.ySize / 2;
                this.vx = 0;
                this.vy = -this.speed;
            }
        } else {
            this.xCoordinate = edgeOrX;
            this.yCoordinate = yOrVx;
            this.vx = vxOrVy;
            this.vy = vy;
            this.speed = Math.sqrt(vxOrVy * vxOrVy + vy * vy);

            if (Math.abs(this.vx) > Math.abs(this.vy)) {
                this.xSize = 100;
                this.ySize = 300;
            } else {
                this.xSize = 300;
                this.ySize = 100;
            }
        }
    }

    updateStatus(islands = [], player, enemies) {
        this.xCoordinate += this.vx;
        this.yCoordinate += this.vy;

        if (
            this.xCoordinate - this.xSize / 2 > width ||
            this.xCoordinate + this.xSize / 2 < 0 ||
            this.yCoordinate - this.ySize / 2 > height ||
            this.yCoordinate + this.ySize / 2 < 0
        ) {
            this.finished = true;
            return;
        }

        for (let island of islands) {
            if (myCollide(this, island)) {
                this.finished = true;
                return;
            }
        }

        let pushForce = this.speed * 0.1;
        let pushX = this.vx * pushForce;
        let pushY = this.vy * pushForce;

        this.applyWaveEffect(player, islands, enemies, pushX, pushY);
        for (let enemy of enemies) {
            this.applyWaveEffect(enemy, islands, enemies, pushX, pushY);
        }
    }

    applyWaveEffect(entity, islands, enemies, pushX, pushY) {
        if (myCollide(this, entity)) {
            let newPos = {
                xCoordinate: entity.xCoordinate + pushX,
                yCoordinate: entity.yCoordinate + pushY,
                xSize: entity.xSize,
                ySize: entity.ySize,
            };
            let collisionDetected = false;

            for (let island of islands) {
                if (myCollide(newPos, island)) {
                    collisionDetected = true;
                    break;
                }
            }
            if (!collisionDetected) {
                for (let enemy of enemies) {
                    if (myCollide(newPos, enemy)) {
                        collisionDetected = true;
                        break;
                    }
                }
            }
            if (!collisionDetected) {
                entity.applyWaveForce(pushX, pushY);
            } else {
                entity.wavePushX = 0;
                entity.wavePushY = 0;
            }
        }
    }

    show() {
        noStroke();
        if (this.isBigWave) {
            fill(255, 0, 0, 127);
        } else {
            fill(0, 0, 255, 127);
        }
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }
}

class WaveManager {
    constructor() {
        this.waves = [];
        this.lastWaveTime = 0;
        this.interval = 500;
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
                    let oppositeHorizontal =
                        (waveA.vx > 0 && waveB.vx < 0) || (waveA.vx < 0 && waveB.vx > 0);
                    let oppositeVertical =
                        (waveA.vy > 0 && waveB.vy < 0) || (waveA.vy < 0 && waveB.vy > 0);
                    let diagonalCollision =
                        (waveA.vx !== 0 && waveB.vy !== 0) ||
                        (waveA.vy !== 0 && waveB.vx !== 0);

                    let sameHorizontal =
                        (waveA.vx > 0 && waveB.vx > 0) || (waveA.vx < 0 && waveB.vx < 0);
                    let sameVertical =
                        (waveA.vy > 0 && waveB.vy > 0) || (waveA.vy < 0 && waveB.vy < 0);

                    if (oppositeHorizontal || oppositeVertical || diagonalCollision) {
                        wavesToRemove.add(i);
                        wavesToRemove.add(j);
                    } else if (sameHorizontal || sameVertical) {
                        let newX = (waveA.xCoordinate + waveB.xCoordinate) / 2;
                        let newY = (waveA.yCoordinate + waveB.yCoordinate) / 2;
                        let newVx = waveA.vx + waveB.vx;
                        let newVy = waveA.vy + waveB.vy;
                        let newWave = new Wave(newX, newY, newVx, newVy, true);
                        newWaves.push(newWave);
                        wavesToRemove.add(i);
                        wavesToRemove.add(j);
                    }
                }
            }
        }

        this.waves = this.waves.filter((wave, index) => !wavesToRemove.has(index));
        this.waves.push(...newWaves);
    }
}
