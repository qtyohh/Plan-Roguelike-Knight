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
        this.abilityCD = 0;
    }
    
    show() {
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

    updateHP(change) {
        this.HP += change;
    }

    putOnBuff() {
        
    }
}