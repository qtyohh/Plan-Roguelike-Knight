class MapUI {
    constructor(inGameCallBack) {
        this.xCoor = width / 2;
        this.yCoor = height / 2;
        this.xSize = width * 0.8;
        this.ySize = height * 0.8;
        this.buttonSize = 20;
        this.row = 5;
        this.col = 5;
        this.drawnRol = -1;
        this.inGameCallBack = inGameCallBack;
        this.playerLocation = {
            row : -1,
            col : 2
        };
    }

    MapButton = class {
        constructor(x, y, size, row, col, gameType) {
            this.x = x;
            this.y = y;
            this.w = size;
            this.h = size;
            this.row = row;
            this.col = col;
            this.gameType = gameType;
            this.isHovered = false;
            this.isPressed = false;
            this.scale = 1;
        }
  
        draw() {
            drawingContext.save();
        
            const mainColor = color(100, 255, 218);
            const hoverColor = color(100, 255, 218, 153);
            const textColor = this.isHovered ? color(0) : mainColor;
            const bgColor = this.isHovered ? hoverColor : color(0, 0);
            
            const currentScale = lerp(this.scale, 1, 0.2);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            scale(currentScale);
            
            drawingContext.shadowColor = mainColor;
            drawingContext.shadowBlur = this.isHovered ? 40 : 20;
            fill(bgColor);
            stroke(mainColor);
            strokeWeight(1);
            rect(0, 0, this.w, this.h, 5);
            
            fill(textColor);
            noStroke();
            textSize(24);
            textAlign(CENTER, CENTER);
            //text(this.label, 0, 0);
    
            drawingContext.restore();
        }
  
        checkHover(chooseShipUI) {
            this.isHovered = (
                mouseX > this.x && 
                mouseX < this.x + this.w &&
                mouseY > this.y && 
                mouseY < this.y + this.h
            );
        
            if(this.isHovered) {
                chooseShipUI.targetBorderSize = 80;
                chooseShipUI.borderColor = color(100, 255, 218, 102);
            }
        }
  
        press() { this.scale = 0.98; }
        
        release() { 
            this.scale = 1;
            // ...
            return this.isHovered;
        }
    }
    
    createButtons(location) {
        let rowNum = location.row + 1;
        let colMin = location.col - 1;
        let colMax = location.col + 1;
        if (colMin < 0) {
            colMin = 0;
        }
        if (colMax >= this.col) {
            colMax = this.col - 1;
        }

        if (this.drawnRol >= rowNum) {
            return;
        }
        this.drawnRol = rowNum;

        for (let col = colMin; col <= colMax; col++) {
            if (this.mapArray[rowNum][col] != 0) {
                let button = new this.MapButton(
                    (0.2 + rowNum / this.row * 0.6) * width,
                    (0.2 + col / this.col * 0.6) * height,
                    this.buttonSize, 
                    rowNum, 
                    col,
                    0
                );
                this.buttons.push(button);
            }
        }
    }
  
    handleMousePressed() {
        this.buttons.forEach(btn => btn.isHovered && btn.press());
    }
  
    handleMouseReleased() {
        let selectedGame = null;
        
        this.buttons.forEach(btn => {
            if(btn.release() && btn.isHovered) {
                selectedGame = btn.gameType;
                this.playerLocation.row = btn.row;
                this.playerLocation.col = btn.col;
            }
        });
        
        if(selectedGame != null && this.inGameCallBack) {
            this.inGameCallBack(selectedGame);
        }
    }
  
    /*handleWindowResized() {
        this.createButtons();
    }*/

    init() {
        noStroke();
        this.mapArray = [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [1, 0, 1, 1, 0],
            [0, 1, 0, 1, 1],
            [0, 0, 1, 0, 0]
        ];
        this.buttons = [];
    }

    update() {
        this.createButtons(this.playerLocation);
    }

    draw() {
        background(0);
        fill(120);
        rect(this.xCoor, this.yCoor, this.xSize, this.ySize);
        this.buttons.forEach(btn => {
            btn.checkHover(this);
            btn.draw();
        });
        
    }
    
}