
const PLAYER_BULLET_TYPE = 0;
const ENEMY_BULLET_TYPE  = 1;
const BOSS_BULLET_TYPE   = 2;

class Bullet extends BasicObject {
    constructor(xCoordinate, yCoordinate, xSpeed, ySpeed, bulletType, attackPower, explosionSize, size, speed) {
        if (bulletType == PLAYER_BULLET_TYPE) {
            super(
                "bullet", 
                BULLET_TYPE,
                xCoordinate, 
                yCoordinate, 
                size, // bullet size
                size, 
                PLAYER_BULLET_ATTACK_BIT,
                10, 
                speed, 
            );
            this.harm = attackPower;
            this.explosionSize = explosionSize;
        } else if (bulletType == ENEMY_BULLET_TYPE) {
            super(
                "bullet", 
                BULLET_TYPE,
                xCoordinate, 
                yCoordinate, 
                2, 
                2, 
                ENEMY_BULLET_ATTACK_BIT,
                1, 
                3
            );
            this.harm = attackPower;
            this.explosionSize = 1;
        } else if (bulletType == BOSS_BULLET_TYPE) {
            super(
                "bullet", 
                BULLET_TYPE,
                xCoordinate, 
                yCoordinate, 
                3, 
                3, 
                ENEMY_BULLET_ATTACK_BIT,
                1, 
                5
            );
            this.harm = 1;
            this.explosionSize = 2;
        }
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.toDelete = false;
        this.exploded = false;
        this.frames = [];   // 存储两帧图片
        this.currentFrame = 0;  // 当前显示的帧
        this.frameRate = 10;  // 每10帧切换一次
        this.frameCount = 0;  // 用于计时

        this.b_frames = [];   // 存储两帧图片
        this.b_currentFrame = 0;  // 当前显示的帧
        this.b_frameRate = 20;  // 每10帧切换一次
        this.b_frameCount = 0;  // 用于计时
    }
    
    preload() {
        console.log('加载子弹动画帧');
        // 加载两帧图
        
        this.frames[0] = loadImage('./img/png/bullet/1.png');
        this.frames[1] = loadImage('./img/png/bullet/2.png');
        this.frames[2] = loadImage('./img/png/bullet/3.png');
        
        
        // this.frames[3] = loadImage('./img/png/BOSS_bullet/3.png');
        // this.frames[4] = loadImage('./img/png/BOSS_bullet/3.png');
        // this.frames[5] = loadImage('./img/png/BOSS_bullet/3.png');
        
        this.b_frames[0] = loadImage('./img/png/BOSS_bullet/1.png');
        this.b_frames[1] = loadImage('./img/png/BOSS_bullet/2.png');
        this.b_frames[2] = loadImage('./img/png/BOSS_bullet/3.png');
        this.b_frames[3] = loadImage('./img/png/BOSS_bullet/4.png');
        this.b_frames[4] = loadImage('./img/png/BOSS_bullet/5.png');
        
        

    }
    
    updateStatus() {

      if(this. BULLET_TYPE = ENEMY_BULLET_TYPE ){
       
        this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
    
        // 每次调用时增加帧计数
        this.b_frameCount++;
    
        // 每隔一段时间切换帧
        if (this.b_frameCount % this.b_frameRate === 0) {
            this.b_currentFrame = (this.b_currentFrame + 1) % this. b_frames.length;
        }

      } 

      if(this. BULLET_TYPE = PLAYER_BULLET_TYPE ){
      this.xCoordinate += this.xSpeed * this.speed;
        this.yCoordinate += this.ySpeed * this.speed;
    
        // 每次调用时增加帧计数
        this.frameCount++;
    
        // 每隔一段时间切换帧
        if (this.frameCount % this.frameRate === 0) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        }
       }
    }
    
    drawBullet() {
        // 使用 frames 数组中的当前帧来绘制子弹
        
        

        if(this. BULLET_TYPE = ENEMY_BULLET_TYPE){
            console.log('敌人子弹')
            imageMode(CENTER);
            image(this.b_frames[this.b_currentFrame], this.xCoordinate, this.yCoordinate, this.b_frames[this.b_currentFrame].width/7, this.b_frames[this.b_currentFrame].height/7 );
        
        }

        if(this. BULLET_TYPE = PLAYER_BULLET_TYPE){
        imageMode(CENTER);
        image(this.frames[this.currentFrame], this.xCoordinate, this.yCoordinate, this.frames[this.currentFrame].width/7, this.frames[this.currentFrame].height/7 );

        }
        






    }
    
    show() {
        // 如果还没有加载图片，则进行加载
        if (this.frames.length === 0 || this.b_frames.length === 0 ) {
            this.preload();
        }
    
        console.log("发射了子弹图片");
    
        // fill(0, 255, 0);
        // rect(this.xCoordinate, this.yCoordinate, this.xSize, this.ySize);
        this.drawBullet();  // 绘制子弹动画帧
    }

    /*explode() {
        if (!this.exploded) {
            fill(0);
            rect(
                this.xCoordinate - this.explosionSize / 2, 
                this.yCoordinate - this.explosionSize / 2, 
                this.xSize + this.explosionSize, 
                this.ySize + this.explosionSize
            );
            this.exploded = true;
            console.log("---------Bullet exploded---------");
        }
    }*/
}
