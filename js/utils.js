/**
 *  attackBit: each bit controls which object could this object attack
 *  player enemy building island
 *  for example: a bullet from player is 0110
 */
const ENEMY_ATTACK_BIT = 0b1000; // if player touch enemy, player will be attacked.
const PLAYER_BULLET_ATTACK_BIT = 0b0110;
const ENEMY_BULLET_ATTACK_BIT = 0b1000;
const NO_HARM_ATTACK_BIT = 0b0000;
const ENVIRONMENT_ATTACK_BIT = 0b1100;
const EXPLORE_ATTACK_BIT = 0b1110;

/**
 *  
 */
const PLAYER_TYPE = 0b1000;
const ENEMY_TYPE = 0b0100;
const BUILDING_TYPE = 0b0010;
const ISLAND_TYPE = 0b0001;


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


function myCollide(itemA, itemB) {
    return collideRectRect(
        itemA.xCoordinate, itemA.yCoordinate, itemA.xSize, itemA.ySize, 
        itemB.xCoordinate, itemB.yCoordinate, itemB.xSize, itemB.ySize
    );
}