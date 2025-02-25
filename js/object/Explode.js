class Explode {
    constructor(xCoor, yCoor, harm, attackBit, explodeType) {
        const explodeModel = getExplodeModel(explodeType);
        this.name = explodeModel.name
        this.xCoordinate = xCoor;
        this.yCoordinate = yCoor;
        this.xSize = explodeModel.xSize;
        this.ySize = explodeModel.ySize;
        this.harm = harm;
        this.attackBit = attackBit;
        this.type = explodeType;
        
        this.frames = [];   // 存储两帧图片
        this.currentFrame = 0;  // 当前显示的帧
        this.frameRate = 5;  // 每10帧切换一次
        this.frameCount = 0;  // 用于计时
    }

    preload() {
        console.log('加载子弹动画帧');
        // 加载两帧图
        this.frames[0] = loadImage('./img/png/explode/1.png');
        this.frames[1] = loadImage('./img/png/bullet/2.png');
        this.frames[1] = loadImage('./img/png/explode/3.png');
        this.frames[1] = loadImage('./img/png/explode/4.png');
        
    }

    updateStatus() {
        
    
        // 每次调用时增加帧计数
        this.frameCount++;
    
        // 每隔一段时间切换帧
        if (this.frameCount % this.frameRate === 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }

        
    }

    drawExplode() {
        
        // 使用 frames 数组中的当前帧来绘制子弹
        imageMode(CENTER);
        image(this.frames[this.currentFrame], this.xCoordinate, this.yCoordinate, this.frames[this.currentFrame].width/7, this.frames[this.currentFrame].height/7 );
    }








    show() {
        this.drawExplode();
        this.updateStatus();
        // fill(255);
        
        // let xCoor = this.xCoordinate;
        // let yCoor = this.yCoordinate;
        // rect(xCoor, yCoor, this.xSize, this.ySize);
    }
}