class GameRewardUI {
    constructor() {
        
    }

    show(playerStatus) {
        push();
    
        noStroke();
        
        fill(0);
        rect(500, 500, 400, 400);
        fill(255);
        text("金币:填充填充", 500, 500);
        text("水手:填充填充", 500, 700);
    
        pop();
      }
}
