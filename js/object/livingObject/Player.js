class Player extends LivingObject {
    constructor(name, xCoordinate, yCoordinate, xSize, ySize, HP, speed) {
        super(
            name, 
            xCoordinate, 
            yCoordinate, 
            xSize, 
            ySize, 
            HP, 
            speed, 
            NO_HARM_ATTACK_BIT
        );
        this.HPmax = HP;
        this.isAlive = true;
        this.abilityCD = 0;
    }
    
    show() {
        fill(255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

    updateHP(change) {
        if (this.isAlive) {
            this.HP += change;
            this.HP = constrain(this.HP, 0, this.HPmax);
            if (this.HP <= 0) {
                this.isAlive = false;
            }
        }
    }

    putOnBuff() {
        
    }
}