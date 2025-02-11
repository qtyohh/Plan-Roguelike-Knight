class PlayerControl {
    constructor(shootCallBack, playerMoveCallBack) {
        this.shootCallBack = shootCallBack;
        this.playerMoveCallBack = playerMoveCallBack; 
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
            xSpeed, 
            ySpeed, 
            PLAYER_BULLET_TYPE
        );
    }

    updateCoordinate() {
        let xMove = 0;
        let yMove = 0;
        if (this.keyMap.up) {
            yMove--;
        } 
        if (this.keyMap.down) {
            yMove++;
        }
        if (this.keyMap.left) {
            xMove--;
        }
        if (this.keyMap.right) {
            xMove++;
        }
        this.playerMoveCallBack(xMove, yMove);
    }

    updateStatus() {
        this.updateCoordinate();
    }


    useSkill() {

    }
}