class Status {
    #playerStatus = {
        xSize : 0,
        ySize : 0,
        HPmax : 0,
        HP : 0,
        speed : 0,
        shipType : 0,
        gold : 0
    };
    #pollution;
    #equipments = [];
    
    constructor() {
        
    }

    setShipBasicStatus(shipType) {
        this.#playerStatus.xSize = SHIP_MODEL[shipType].xSize;
        this.#playerStatus.ySize = SHIP_MODEL[shipType].ySize;
        this.#playerStatus.HPmax = SHIP_MODEL[shipType].HPmax;
        this.#playerStatus.HP = this.#playerStatus.HPmax;
        this.#playerStatus.speed = SHIP_MODEL[shipType].speed;
    }

    getShipBasicStatus() {
        return this.#playerStatus;
    }
}