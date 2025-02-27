const BASIC_EXPLORE_SIZE = 80;
const EXPLORE_WAITING_TIME = 100;
const TNT_EXPLODE_HARM = 2;

class Building extends BasicObject {
    constructor(xCoor, yCoor, modelType, explodeCallBack) {
        const buildingModel = getBuildingModel(modelType);
        super(
            buildingModel.name,
            BUILDING_TYPE,
            xCoor, 
            yCoor, 
            buildingModel.xSize, 
            buildingModel.ySize, 
            NO_HARM_ATTACK_BIT,
            buildingModel.HP,
            0
        );
        this.modelType = buildingModel.type;
        this.explodeCallBack = explodeCallBack;
        this.img;
    }
    
    show() {

        
        fill(255, 255, 255);
        super.show();
        if (this.modelType == BUILDING_MODEL_BOMB_TYPE) {
            this.updateHP(-1);
        }

    }
    
    updateHP(change) {
        super.updateHP(change);
        if (!this.isAlive) {
            console.log(this);
        }
    }

    move(xSpeed, ySpeed) {
        super.move(xSpeed, ySpeed);
    }

    deadRattle() {
        console.log("----dead rattle----");
        switch(this.modelType) {
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