class Game {
    #player;
    #enemies;
    #bullets;
    #islands;
    #buildings;
    #playerController;
    #gameOver;
    #gameWin;

    constructor(updateStepCallBack) {
        this.#player = null;
        this.#enemies = [];
        this.#bullets = [];
        this.#islands = [];
        this.#buildings = [];
        this.#playerController = null;
        this.#gameOver = false;
        this.#gameWin = false;
        this.updateStepCallBack = updateStepCallBack;
    }

    initPlayer(playerBasicStatus) {
        this.#player = new Player(
            "Player", 
            300, 
            200, 
            playerBasicStatus.xSize, 
            playerBasicStatus.ySize, 
            playerBasicStatus.HP, 
            playerBasicStatus.speed
        );
        this.#playerController = new PlayerControl(
            this.#player,
            (xSpeed, ySpeed, bulletType) => this.addBullet(xSpeed, ySpeed, bulletType),
            (xMove, yMove) => this.playerMove(xMove, yMove),
            () => this.addBomb()
        );
    }

    initEnemies() {
        const enemy = new Enemy(300, 100, EASY_ENEMY_MODEL_1_TYPE);
        this.#enemies.push(enemy);
    }

    initIslands() {
        const island = new Island(200, 300, ISLAND_MODEL_1_TYPE);
        this.#islands.push(island);
    }

    initBuilding() {

        const building = new Building(
            100, 
            100, 
            BUILDING_MODEL_TNT_TYPE,
            (xCoor, yCoor, harm, attackBit, explodeType) => 
                this.addExplode(xCoor, yCoor, harm, attackBit, explodeType)
        );
        this.#buildings.push(building);
    }

    getPlayerStatus() {
        const playerStatus = {
            HP : this.#player.HP
        };
        return playerStatus;
    }

    getPlayerController() {
        return this.#playerController;
    }

    getGameOver() {
        return this.#gameOver;
    }

    getGameWin() {
        return this.#gameWin;
    }

    updateObjectStatus() {
        for (let i = 0; i < this.#bullets.length; i++) {
            let bullet = this.#bullets[i];
            bullet.updateStatus();
            if (this.checkCollideBullet(bullet)) {
                this.#bullets[i].toDelete = true;
                console.log(bullet);
                this.addExplode(
                    bullet.xCoordinate,
                    bullet.yCoordinate,
                    bullet.harm,
                    bullet.attackBit,
                    EXPLODE_MODEL_BULLET_TYPE
                );
                this.#bullets[i].toDelete = true;
                this.#bullets[i].explode();
            } else {
                bullet.show();
            }
        }
        this.#bullets = this.#bullets.filter(bullet => !bullet.toDelete);

        
        if (this.#buildings.length != 0) {
            for (let i = this.#buildings.length - 1; i >= 0; --i) {
                let building = this.#buildings[i];
                if (!building.isAlive) {
                    this.#buildings.splice(i, 1);
                    building.deadRattle();
                } else {
                    building.show();
                }
            }
        }


        if (this.#player.isAlive == false) {
            this.#gameOver = true;
            console.log("Game Over!");
        }
        this.#playerController.updateStatus();
        this.#player.show();    

        for (let island of this.#islands) {
            island.show();
        }

        if (this.#enemies.length != 0) {
            for (let i = this.#enemies.length - 1; i >= 0; --i) {
                let enemy = this.#enemies[i];
                if (!enemy.isAlive) {
                    this.#enemies.splice(i, 1);
                } else {
                    enemy.show();
                }
            }
        }
        if (this.#enemies.length == 0) {
            this.#gameWin = true;
        }

        /*if (this.#enemies.length == 0) {
            this.updateStepCallBack(MAIN_STEP_GAME_REWARD);
        }*/
    }   

    checkCollideBullet(bullet) {
        for (let island of this.#islands) {
            if (myCollide(island, bullet)) {
                return true;
            }
        }
        
        for (let enemy of this.#enemies) {
            if (myCollide(enemy, bullet)) {
                return true;
            }
        }

        if (myCollide(this.#player, bullet)) {
            return true;
        }

        for (let building of this.#buildings) {
            if (myCollide(building, bullet)) {
                return true;
            }
        }
        return false;
    }

    checkCollidePlayer(xMove, yMove) {
        let location = {
            xCoordinate : this.#player.xCoordinate + xMove * this.#player.speed,
            yCoordinate : this.#player.yCoordinate + yMove * this.#player.speed,
            xSize : this.#player.xSize,
            ySize : this.#player.ySize
        };
        for (let island of this.#islands) {
            if (myCollide(location, island)) {
                return true;
            } 
        }

        for (let building of this.#buildings) {
            if (building.modelType == BUILDING_MODEL_BOMB_TYPE) {
                continue;
            }
            if (myCollide(location, building)) {
                return true;
            }
        }
        for (let enemy of this.#enemies) {
            if (myCollide(location, enemy)) {
                return true;
            }
        }
        return false;
    }

    checkCollideEnemy(enemy) {

    }

    checkCollideExplode(explode) {
        if (explode.attackBit & BUILDING_TYPE) {
            for (let building of this.#buildings) {
                if (myCollide(explode, building)) {
                    building.updateHP(explode.harm * -1);
                }
            }
        }
        if (explode.attackBit & ENEMY_TYPE) {
            for (let enemy of this.#enemies) {
                if (myCollide(explode, enemy)) {
                    enemy.updateHP(explode.harm * -1);
                }
            }
        }
        if (explode.attackBit & PLAYER_TYPE) {
            if (myCollide(explode, this.#player)) {
                this.#player.updateHP(explode.harm * -1);
            }
        }
    }

    addBullet(xSpeed, ySpeed, bulletType) {
        const currentWeapon = this.#player.equipment.getCurrentWeapon();
        const bullet = new Bullet(
            this.#player.xCoordinate + xSpeed * 10, 
            this.#player.yCoordinate + ySpeed * 10, 
            xSpeed, 
            ySpeed, 
            bulletType, 
            currentWeapon.attackPower, 
            currentWeapon.explosionSize,
            currentWeapon.bulletSize,
            currentWeapon.bulletSpeed
        );
        this.#bullets.push(bullet);
    }

    addBomb() {
        let xCoor = this.#player.xCoordinate + this.#player.xSize / 2;
        let yCoor = this.#player.yCoordinate + this.#player.xSize / 2;
        const bomb = new Building(
            xCoor, 
            yCoor, 
            BUILDING_MODEL_BOMB_TYPE,
            (x, y, harm, attackBit, explodeType) => 
                this.addExplode(x, y, harm, attackBit, explodeType)
        );
        this.#buildings.push(bomb);
    }

    addExplode(xCoor, yCoor, harm, attackBit, explodeType) {
        const explode = new Explode(xCoor, yCoor, harm, attackBit, explodeType);
        explode.show();
        this.checkCollideExplode(explode);
    }

    playerMove(xMove, yMove) {
        if (this.checkCollidePlayer(xMove, yMove) == false) {
            this.#player.move(xMove, yMove);
        }
        else {
            if (this.checkCollidePlayer(xMove, 0) == false) {
                this.#player.move(xMove, 0);
            }
            if (this.checkCollidePlayer(0, yMove) == false) {
                this.#player.move(0, yMove);
            }
        }
    }
}