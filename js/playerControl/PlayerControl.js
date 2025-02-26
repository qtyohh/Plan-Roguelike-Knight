class PlayerControl {
    #player;
    constructor(player, shootCallBack, playerMoveCallBack, skillUseCallBack) {
        this.#player = player;
        this.shootCallBack = shootCallBack;
        this.playerMoveCallBack = playerMoveCallBack; 
        this.skillUseCallBack = skillUseCallBack;
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

        if ((keyIsDown(68) && keyIsDown(83))){
            this.#player.setAnimation('DS');
        }

        if ((keyIsDown(65) && keyIsDown(83))){
            this.#player.setAnimation('AS');
        }

        if ((keyIsDown(87) && keyIsDown(65))){
            this.#player.setAnimation('AW');
        }

        if ((keyIsDown(87) && keyIsDown(68))){
            this.#player.setAnimation('DW');
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

        // switch weapon
        if (key == 'q' || key == 'Q') {
            this.#player.equipment.switchWeaponByKey();
        }

        //skill
        if (key == " ") {
            this.skillUseCallBack();
        }
    }

    keyReleased() {
        if (key == 'w' || key == 'W') {
            this.keyMap.up = false;
            // this.#player.setAnimation('idleW');//调用向上静止帧
        }
        if (key == 'a' || key == 'A') {
            this.keyMap.left = false;
            // this.#player.setAnimation('idleA');//调用向左静止帧
        }
        if (key == 's' || key == 'S') {
            this.keyMap.down = false;
            // this.#player.setAnimation('idleS');//调用向下静止帧
        }
        if (key == 'd' || key == 'D') {
            this.keyMap.right = false;
            // this.#player.setAnimation('idleD');//调用向右静止帧
        }
    }
    
    mousePressed() {
        
    }

    shoot(xSpeed, ySpeed) {
        console.log("Shooting!");
        const currentWeapon = this.#player.equipment.getCurrentWeapon();
        if (currentWeapon) {
            this.shootCallBack(
                xSpeed, 
                ySpeed, 
                PLAYER_BULLET_TYPE, 
                /*currentWeapon.attackPower,
                currentWeapon.bulletSize, 
                currentWeapon.bulletSpeed, 
                currentWeapon.explosionSize*/
            );
        } else {
            console.log("No weapon equipped");
        }
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
        if (this.#player.skillCD > 0) {
            console.log("playerControl() Skill is not ready");
            return;
        }

        console.log("playerControl() Using skill");
        this.skillUseCallBack();
        this.#player.skillCD = this.#player.maxSkillCD;
    }
}