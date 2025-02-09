
/* basic values of enemies */
const EASY_ENEMY_MODEL_1_TYPE = 0;

const ENEMY_MODEL = [
    {
        name : "easy_enemy_1",
        type : EASY_ENEMY_MODEL_1_TYPE,
        xSize : 30,  
        ySize : 30,
        HP : 5,
        speed : 1
    },

];

class Enemy extends LivingObject {
    constructor(xCoordinate, yCoordinate, enemyModelType) {
        super(
            ENEMY_MODEL[enemyModelType].name,
            xCoordinate,
            yCoordinate,
            ENEMY_MODEL[enemyModelType].xSize,
            ENEMY_MODEL[enemyModelType].ySize,
            ENEMY_MODEL[enemyModelType].HP,
            ENEMY_MODEL[enemyModelType].speed,
            ENEMY_ATTACK_BIT
        );
        this.type = ENEMY_MODEL[enemyModelType].type;
    }

    show() {
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
    }

}

