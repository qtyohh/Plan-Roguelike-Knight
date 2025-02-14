const MAIN_STEP_START_UI = 0;
const MAIN_STEP_CHOOSE_SHIP_UI = 1;
const MAIN_STEP_CHOOSE_MODE_UI = 2;
const MAIN_STEP_CHOOSE_SEAMAN_UI = 3;
const MAIN_STEP_IN_GAME = 4;

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


/** basic values of ships */
const SHIP_MODEL_ERROR_TYPE = 0;
const SHIP_MODEL_1_TYPE = 1;
const SHIP_MODEL_2_TYPE = 2;
const SHIP_MODEL_3_TYPE = 3;
const SHIP_MODEL_MAX_TYPE = 4;

const SHIP_MODEL = [
    {
        name : 0,
        type : 0,
        xSize : 0,
        ySize : 0,
        HPmax : 0,
        speed : 0
    } , {
        name : "ship1",
        type : SHIP_MODEL_1_TYPE,
        xSize : 10,
        ySize : 10,
        HPmax : 5,
        speed : 5
    } , {
        name : "ship2",
        type : SHIP_MODEL_2_TYPE,
        xSize : 10,
        ySize : 10,
        HPmax : 7,
        speed : 1
    } , {
        name : "ship3",
        type : SHIP_MODEL_3_TYPE,
        xSize : 8,
        ySize : 8,
        HPmax : 4,
        speed : 10
    }
];


/* basic values of enemies */
const ENEMY_MODEL_ERROR_TYPE = 0;
const EASY_ENEMY_MODEL_1_TYPE = 1;

const ENEMY_MODEL = [
    {
        name : 0,
        type : 0,
        xSize : 0,  
        ySize : 0,
        HP : 0,
        speed : 0
    }, {
        name : "easy_enemy_1",
        type : EASY_ENEMY_MODEL_1_TYPE,
        xSize : 15,  
        ySize : 15,
        HP : 5,
        speed : 1
    },

];

function getEnemyModel(enemyType) {
    if (enemyType >= ENEMY_MODEL.length || enemyType < 0) {
        console.log("getEnemyModel : enemyType error.");
        return ENEMY_MODEL[ENEMY_MODEL_ERROR_TYPE];
    }
    return ENEMY_MODEL[enemyType];
}



/* basic values of islands */
const ISLAND_MODEL_ERROR_TYPE = 0;
const ISLAND_MODEL_1_TYPE = 1;

const ISLAND_MODEL = [
    {
        name : 0,
        type : 0,
        xSize : 0,
        ySize : 0
    }, {
        name : "island_1",
        type : ISLAND_MODEL_1_TYPE,
        xSize : 50,
        ySize : 50
    },
]

function getIslandModel(islandType) {
    if (islandType >= ISLAND_MODEL.length || islandType < 0) {
        console.log("getIslandModel : islandType error.");
        return ISLAND_MODEL[ISLAND_MODEL_ERROR_TYPE];
    }
    return ISLAND_MODEL[islandType];
}

/** basic of building models */
const BUILDING_MODEL_ERROR_TYPE = 0;
const BUILDING_MODEL_TNT_TYPE = 1;

const BUILDING_MODEL = [
    {
        name : 0,
        type : 0,
        xSize : 0,
        ySize : 0,
        HP : 0
    }, {
        name : "TNT",
        type : BUILDING_MODEL_TNT_TYPE,
        xSize : 10,
        ySize : 10,
        HP : 1
    },
];

function getBuildingModel(buildingType) {
    if (buildingType >= BUILDING_MODEL.length || buildingType < 0 ) {
        console.log("getIslandModel : islandType error.");
        return BUILDING_MODEL[BUILDING_MODEL_ERROR_TYPE];
    }
    return BUILDING_MODEL[buildingType];
}

function myCollide(itemA, itemB) {
    return collideRectRect(
        itemA.xCoordinate, itemA.yCoordinate, itemA.xSize, itemA.ySize, 
        itemB.xCoordinate, itemB.yCoordinate, itemB.xSize, itemB.ySize
    );
}