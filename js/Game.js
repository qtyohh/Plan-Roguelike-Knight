class Game {
    constructor() {
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.islands = [];
        this.buildings = [];
        this.playerController = null;
    }

    initPlayer(playerBasicStatus) {
        this.player = new Player(
            "Player", 
            300, 
            200, 
            playerBasicStatus.xSize, 
            playerBasicStatus.ySize, 
            playerBasicStatus.HP, 
            playerBasicStatus.speed
        );
        this.playerController = new PlayerControl(
            this.player,
            (xSpeed, ySpeed, bulletType) => this.addBullet(xSpeed, ySpeed, bulletType),
            (xMove, yMove) => this.playerMove(xMove, yMove)
        );
    }

    initEnemies() {
        const enemy = new Enemy(300, 100, EASY_ENEMY_MODEL_1_TYPE);
        this.enemies.push(enemy);
    }

    initIslands() {
        const island = new Island(200, 300, ISLAND_MODEL_1_TYPE);
        this.islands.push(island);
    }

    initBuilding() {
        const building = new Building(100, 100, BUILDING_MODEL_TNT_TYPE);
        this.buildings.push(building);
    }

    updateObjectStatus() {        
        for (let island of this.islands) {
            island.show();
        }

        for (let i = this.buildings.length - 1; i >= 0; --i) {
            let building = this.buildings[i];
            /*if (!enemy.isAlive) {
                this.buildings.splice(i, 1);
            } else {*/
                building.show();
            //}
        }

        this.playerController.updateStatus();
        this.player.show();

        for (let i = this.enemies.length - 1; i >= 0; --i) {
            let enemy = this.enemies[i];
            enemy.show();
            if (!enemy.isAlive) {
                this.enemies.splice(i, 1);
            }
        }

        for (let i = 0; i < this.bullets.length; i++) {
            let bullet = this.bullets[i];
            bullet.updateStatus();
            if (this.checkCollideBullet(bullet)) {
                this.bullets[i].toDelete = true;
                this.bullets[i].explode();
            } else {
                bullet.show();
            }
        }
        this.bullets = this.bullets.filter(bullet => !bullet.toDelete);
        
    }   

    checkCollideBullet(bullet) {
        for (let island of this.islands) {
            if (myCollide(island, bullet)) {
                return true;
            }
        }
        
        for (let enemy of this.enemies) {
            if (myCollide(enemy, bullet)) {
                if (bullet.attackBit & ENEMY_TYPE) {
                    enemy.updateHP(-1 * bullet.harm);
                    return true;
                }
            }
        }

        if (myCollide(this.player, bullet)) {
            if (bullet.attackBit & PLAYER_TYPE) {
                this.player.updateHP(-1 * bullet.harm);
                return true;
            }
        }
        
        for (let building of this.buildings) {
            if (myCollide(building, bullet)) {
                if (bullet.attackBit & BUILDING_TYPE) {
                    building.updateHP(-1 * bullet.harm);
                    return true;
                }
            }
        }
        return false;
    }

    checkCollidePlayer(xMove, yMove) {
        let location = {
            xCoordinate : this.player.xCoordinate + xMove * this.player.speed,
            yCoordinate : this.player.yCoordinate + yMove * this.player.speed,
            xSize : this.player.xSize,
            ySize : this.player.ySize
        };
        for (let island of this.islands) {
            if (myCollide(location, island)) {
                return true;
            } 
        }

        for (let building of this.buildings) {
            if (myCollide(location, building)) {
                return true;
            }
        }
        for (let enemy of this.enemies) {
            if (myCollide(location, enemy)) {
                return true;
            }
        }
        return false;
    }

    checkCollideEnemy(enemy) {

    }

    addBullet(xSpeed, ySpeed, bulletType) {
        const currentWeapon = this.player.equipment.getCurrentWeapon();
        const bullet = new Bullet(
            this.player.xCoordinate + xSpeed * 5, 
            this.player.yCoordinate + ySpeed * 5, 
            xSpeed, 
            ySpeed, 
            bulletType, 
            currentWeapon.attackPower, 
            currentWeapon.explosionSize,
            currentWeapon.bulletSize,
            currentWeapon.bulletSpeed
        );
        this.bullets.push(bullet);
    }

    playerMove(xMove, yMove) {
        if (this.checkCollidePlayer(xMove, yMove) == false) {
            this.player.move(xMove, yMove);
        }
        else {
            if (this.checkCollidePlayer(xMove, 0) == false) {
                this.player.move(xMove, 0);
            }
            if (this.checkCollidePlayer(0, yMove) == false) {
                this.player.move(0, yMove);
            }
        }
    }
}