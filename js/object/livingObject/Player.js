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
        this.wavePushX = 0;
        this.wavePushY = 0;
        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 200;

        this.framesD = [];
        this.framesIdleD = [];

        this.framesS = [];
        this.framesIdleS = [];

        this.framesA = [];
        this.framesIdleA = [];

        this.framesW = [];
        this.framesIdleW = [];

        this.framesDS = [];

        this.framesAS = [];

        this.framesAW = [];

        this.framesDW = [];



        this.currentFrames = [];
        this.frameIndex = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 100;

        

        
    }

    preload(){
        console. log('加载图片--------------');

        //加载船头向右的图片-----------------------------------------------------------------------------------------------

        this.framesD.push(loadImage('./img/png/main_boat/move_right/1.png'));
        this.framesD.push(loadImage('./img/png/main_boat/move_right/2.png'));
        this.framesD.push(loadImage('./img/png/main_boat/move_right/3.png'));

        this.framesIdleD.push(loadImage('./img/png/main_boat/move_right/4.png'));
        this.framesIdleD.push(loadImage('./img/png/main_boat/move_right/5.png'));

        //加载船头向下的图片-----------------------------------------------------------------------------------------------

        this.framesS.push(loadImage('./img/png/main_boat/move_down/1.png'));
        this.framesS.push(loadImage('./img/png/main_boat/move_down/2.png'));
        this.framesS.push(loadImage('./img/png/main_boat/move_down/3.png'));

        this.framesIdleS.push(loadImage('./img/png/main_boat/move_down/4.png'));
        this.framesIdleS.push(loadImage('./img/png/main_boat/move_down/5.png'));

        //加载船头向左的图片-----------------------------------------------------------------------------------------------

        this.framesA.push(loadImage('./img/png/main_boat/move_left/1.png'));
        this.framesA.push(loadImage('./img/png/main_boat/move_left/2.png'));
        this.framesA.push(loadImage('./img/png/main_boat/move_left/3.png'));

        this.framesIdleA.push(loadImage('./img/png/main_boat/move_left/4.png'));
        this.framesIdleA.push(loadImage('./img/png/main_boat/move_left/5.png'));

        //加载船头向上的图片-----------------------------------------------------------------------------------------------

        this.framesW.push(loadImage('./img/png/main_boat/move_up/1.png'));
        this.framesW.push(loadImage('./img/png/main_boat/move_up/2.png'));
        this.framesW.push(loadImage('./img/png/main_boat/move_up/3.png'));

        this.framesIdleW.push(loadImage('./img/png/main_boat/move_up/4.png'));
        this.framesIdleW.push(loadImage('./img/png/main_boat/move_up/5.png'));

        //加载船头右下-------------------------------------------------------------------------------------------------------------

        this.framesDS.push(loadImage('./img/png/main_boat/right_down/1.png'));
        this.framesDS.push(loadImage('./img/png/main_boat/right_down/2.png'));
        this.framesDS.push(loadImage('./img/png/main_boat/right_down/3.png'));

        //加载船头左下-------------------------------------------------------------------------------------------------------------

        this.framesAS.push(loadImage('./img/png/main_boat/left_down/1.png'));
        this.framesAS.push(loadImage('./img/png/main_boat/left_down/2.png'));
        this.framesAS.push(loadImage('./img/png/main_boat/left_down/3.png'));

        //加载船头左上-------------------------------------------------------------------------------------------------------------

        this.framesAW.push(loadImage('./img/png/main_boat/left_up/1.png'));
        this.framesAW.push(loadImage('./img/png/main_boat/left_up/2.png'));
        this.framesAW.push(loadImage('./img/png/main_boat/left_up/3.png'));

        //加载船头右上-------------------------------------------------------------------------------------------------------------

        this.framesDW.push(loadImage('./img/png/main_boat/right_up/1.png'));
        this.framesDW.push(loadImage('./img/png/main_boat/right_up/2.png'));
        this.framesDW.push(loadImage('./img/png/main_boat/right_up/3.png'));




        this.currentFrames = this.framesIdleD;
    }

    updateAnimation() {
        if (millis() - this.lastFrameTime > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.currentFrames.length;
            this.lastFrameTime = millis();
        }
    }

    // setAnimation(type) {
    //     if (type === 'S') {
    //         this.currentFrames = this.framesS;
    //     } else {
    //         this.currentFrames = this.framesIdleS;
    //     }
    //     this.frameIndex = 0; // 重置动画索引
    // }

    setAnimation(type) {
        if (type === 'D') {
            this.currentFrames = this.framesD;
        } 
        else if(type === 'idleD'){
            this.currentFrames = this.framesIdleD;
        }
        else if(type === 'S'){
            this.currentFrames = this.framesS;
        }
        else if(type === 'idleS'){
            this.currentFrames = this.framesIdleS;
        }
        else if(type === 'A'){
            this.currentFrames = this.framesA;
        }
        else if(type === 'idleA'){
            this.currentFrames = this.framesIdleA;
        }
        else if(type === 'W'){
            this.currentFrames = this.framesW;
        }
        else if(type === 'idleW'){
            this.currentFrames = this.framesIdleW;
        }
        else if(type === 'DS'){
            this.currentFrames = this.framesDS;
        }

        else if(type === 'AS'){
            this.currentFrames = this.framesAS;
        }

        else if(type === 'AW'){
            this.currentFrames = this.framesAW;
        }

        else if(type === 'DW'){
            this.currentFrames = this.framesDW;
        }
       
        this.frameIndex = 0
    }
    

    

    
    
    show() {
        //fill(255);
        //super.show();
        this.updateAnimation();
        this.drawmainboat();
    }
    updateHP(change) {
        super.updateHP(change);
    }


    move(xSpeed, ySpeed) {

        

        
        let newX = this.xCoordinate + xSpeed * this.speed + this.wavePushX;
        let newY = this.yCoordinate + ySpeed * this.speed + this.wavePushY;

        newX = constrain(newX, this.xSize / 2, width - this.xSize / 2);
        newY = constrain(newY, this.ySize / 2, height - this.ySize / 2);

        this.xCoordinate = newX;
        this.yCoordinate = newY;

        this.wavePushX *= 0.95;
        this.wavePushY *= 0.95;

       

        if(xSpeed > 0){

            this. setAnimation('D');//调用向右移动帧
        }

        if(xSpeed < 0){

            this. setAnimation('A');//调用向右移动帧
        }

        if(ySpeed > 0){

            this. setAnimation('W');//调用向右移动帧
        }

        if(ySpeed < 0){

            this. setAnimation('W');//调用向右移动帧
        }

        if(xSpeed > 0  && ySpeed > 0){

            this. setAnimation('DS');//调用向右移动帧
        }

        if(xSpeed > 0  && ySpeed < 0){

            this. setAnimation('DW');//调用向右移动帧
        }

        if(xSpeed < 0  && ySpeed < 0){

            this. setAnimation('AW');//调用向右移动帧
        }

        if(xSpeed < 0  && ySpeed > 0){

            this. setAnimation('AS');//调用向右移动帧
        }

        if(xSpeed ==0  && ySpeed == 0 && keyReleased && key == 87){

            this. setAnimation('idleW');//调用向右移动帧
        }
        if(xSpeed == 0 && ySpeed == 0 ){

            this. setAnimation('idleA');//调用向右移动帧
        }
        if(xSpeed ==0  && ySpeed == 0 > 0 && this.key === 83){

            this. setAnimation('idleS');//调用向右移动帧
        }
        if(xSpeed ==0  && ySpeed == 0 > 0 && this.key ===68){

            this. setAnimation('idleD');//调用向右移动帧
        }

        // if(xSpeed == 0  && ySpeed == 0 && this. playerControl.keyReleased.keyMap.up  ){

        //     this. setAnimation('idleW');//调用向右移动帧
        // }

        // if(xSpeed == 0  && ySpeed == 0 && this. playerControl.keyReleased.keyMap.down == false ){

        //     this. setAnimation('idleS');//调用向右移动帧
        // }

        // if(xSpeed == 0  && ySpeed == 0 && this. playerControl.keyReleased.keyMap.right== false ){

        //     this. setAnimation('idleD');//调用向右移动帧
        // }

        if(xSpeed == 0  && ySpeed == 0  ){

            this. setAnimation('idleD');//调用向右移动帧
        }
        


    }

    drawmainboat(){ 

        
        imageMode(CENTER);
        image(this.currentFrames[this.frameIndex], this.xCoordinate , this.yCoordinate , this.currentFrames[this.frameIndex].width/7, this.currentFrames[this.frameIndex].height/7 );
    }

    applyWaveForce(forceX, forceY) {
        this.wavePushX = this.wavePushX * 0.9 + forceX;
        this.wavePushY = this.wavePushY * 0.9 + forceY;
    }


    putOnBuff() {

    }
}