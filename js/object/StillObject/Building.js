const BASIC_EXPLORE_SIZE = 80;
const EXPLORE_WAITING_TIME = 100;
const TNT_EXPLODE_HARM = 2;

class Building extends BasicObject {
    constructor(xCoor, yCoor, modelType, explodeCallBack) {
        const buildingModel = getBuildingModel(modelType);
        super(
            buildingModel.name, 
            xCoor - buildingModel.xSize / 2, 
            yCoor - buildingModel.ySize / 2, 
            buildingModel.xSize, 
            buildingModel.ySize, 
            NO_HARM_ATTACK_BIT
        );
        this.HP = buildingModel.HP;
        this.type = buildingModel.type;
        this.explodeCallBack = explodeCallBack;
        this.MaxHP = buildingModel.HP;
        this.isAlive = true;
    }
    show() {
        fill(255, 255, 255);
        rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        if (this.type == BUILDING_MODEL_BOMB_TYPE) {
            this.updateHP(-1);
        }
    }

    updateHP(change) {
        if (this.isAlive) {
            this.HP += change;
            this.HP = constrain(this.HP, 0, this.MaxHP);
            if (this.HP <= 0) {
                this.isAlive = false;
            }
        }
    }

    deadRattle() {
        switch(this.type) {
            case BUILDING_MODEL_TNT_TYPE: {
                this.explodeCallBack(
                    this.xCoordinate,
                    this.yCoordinate,
                    TNT_EXPLODE_HARM,
                    EXPLODE_ATTACK_BIT,
                    EXPLODE_MODEL_TNT_TYPE
                );
                break;
            }
            case BUILDING_MODEL_BOMB_TYPE: {
                this.explodeCallBack(
                    this.xCoordinate,
                    this.yCoordinate,
                    TNT_EXPLODE_HARM,
                    EXPLODE_ATTACK_BIT,
                    EXPLODE_MODEL_BOMB_TYPE
                );
                break;
            }
        }
    }

}