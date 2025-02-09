class PlayerControl {
    constructor(player, shootCallBack) {
        this.player = player;
        this.shootCallBack = shootCallBack;
        this.keyMap = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    keyPressed() {
        // move
        if (key == 'w' || key == 'W') {
            this.keyMap.up = true;
        }
        if (key == 'a' || key == 'A') {
            this.keyMap.left = true;
        }
        if (key == 's' || key == 'S') {
            this.keyMap.down = true;
        }
        if (key == 'd' || key == 'D') {
            this.keyMap.right = true;
        }

        //shoot
        if (keyCode == UP_ARROW) {
            this.shoot(0, -1);
        }
        if (keyCode == DOWN_ARROW) {
            this.shoot(0, 1);
        }
        if (keyCode == LEFT_ARROW) {
            this.shoot(-1, 0);
        }
        if (keyCode == RIGHT_ARROW) {
            this.shoot(1, 0);
        }

        //skill
    }

    keyReleased() {
        if (key == 'w' || key == 'W') {
            this.keyMap.up = false;
        }
        if (key == 'a' || key == 'A') {
            this.keyMap.left = false;
        }
        if (key == 's' || key == 'S') {
            this.keyMap.down = false;
        }
        if (key == 'd' || key == 'D') {
            this.keyMap.right = false;
        }
    }
    
    shoot(xSpeed, ySpeed) {
        console.log("Shooting!");
        this.shootCallBack(
            this.player.xCoordinate + xSpeed * 5, 
            this.player.yCoordinate + ySpeed * 5, 
            xSpeed, 
            ySpeed, 
            PLAYER_BULLET_TYPE
        );
    }

    updateCoordinate() {
        let speed = this.player.speed;
        if (this.keyMap.up) {
            this.player.yCoordinate -= speed;
        } 
        if (this.keyMap.down) {
            this.player.yCoordinate += speed;
        }
        if (this.keyMap.left) {
            this.player.xCoordinate -= speed;
        }
        if (this.keyMap.right) {
            this.player.xCoordinate += speed;
        }
    }

    updateStatus() {
        this.updateCoordinate();
    }


    useSkill() {

    }
}