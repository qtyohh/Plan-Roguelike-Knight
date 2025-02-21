class InGameUI {
    constructor() {

    }

    show(playerStatus) {
        push();
    
        noStroke();
        fill(200, 150);             
        rect(110, 50, 200, 80);   
    
        fill(255);              
        textSize(16);
        text(`HP: ${playerStatus.HP} / ${playerStatus.maxHP}`, 20, 40);
    
        text(`Skill CD: ${0} s`, 20, 65);
    
        pop();
      }
}