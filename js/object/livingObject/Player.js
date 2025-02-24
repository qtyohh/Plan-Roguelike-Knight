class Player extends BasicObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed, skillCD, maxSkillCD) {
        super(
            name, 
            PLAYER_TYPE,
            xCoordinate, 
            yCoordinate, 
            xSize, 
            ySize, 
            NO_HARM_ATTACK_BIT,
            HP, 
            speed, 
        );
        this.HPmax = HP;
        this.skillCD = skillCD;
        this.maxSkillCD = maxSkillCD;
        this.equipment = new Equipment(name, 0, 0, 0, 0, 0, {});
    }
    
    show() {
        fill(255);
        super.show();
    }

    updateHP(change) {
        super.updateHP(change);
    }

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

    putOnBuff() {
        
    }
}