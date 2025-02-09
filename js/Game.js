class Game {
    constructor() {
        this.player = null;
        this.enemies = [];
        this.bullets = [];
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
        const enemy = new Enemy(300, 20, EASY_ENEMY_MODEL_1_TYPE);
        this.enemies.push(enemy);
    }

    initIslands() {

    }

    updateObjectStatus() {
        this.playerController.updateStatus();
        this.player.show();
        
        for (let enemy of this.enemies) {
            enemy.show();
        }

        for (let bullet of this.bullets) {
            bullet.updateStatus();
            if (checkHit(bullet)) {
                
            } else {
                bullet.show();
            }
        }

    }

    checkHit(bullet) {
        if (bullet.attackBit & PLAYER_TYPE) {
            
        }

        if (bullet.attackBit & ENEMY_TYPE) {

        }

        if (bullet.attackBit & BUILDING_TYPE) {

        }

        if (bullet.attackBit & ISLAND_TYPE) {

        }
    }

    addBullet(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType) {
        const bullet = new Bullet(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType);
        this.bullets.push(bullet);
    }
}