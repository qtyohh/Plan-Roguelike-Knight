class Game {
    constructor() {
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.islands = [];
        this.playerController = null;
    }

    initPlayer() {
        this.player = new Player(0, 300, 200, 10, 10, 5, 5);
        this.playerController = new PlayerControl(
            this.player,
            (x, y, vx, vy, bulletType) => this.addBullet(x, y, vx, vy, bulletType)
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

    updateObjectStatus() {
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
            if (this.checkCollide(bullet)) {
                this.bullets[i].toDelete = true;
            } else {
                bullet.show();
            }
        }
        this.bullets = this.bullets.filter(bullet => !bullet.toDelete);
    }   

    checkCollide(bullet) {
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
        

        /*if (bullet.attackBit & BUILDING_TYPE) {

        }*/

    }

    addBullet(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType) {
        const bullet = new Bullet(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType);
        this.bullets.push(bullet);
    }
}