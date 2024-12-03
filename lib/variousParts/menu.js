
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

export class Menu{
    game
    constructor(game){
        this.game = game
    }

    width = [700,0,0]
    tick(){
        this.draw()
        if(kd.W.isDown()){
            this.game.state="game"
        }
        if(this.game.state=="game"){
            this.width[0]=this.width[0]*.9
        }
    }
    draw(){
        
        ctx.beginPath();
        ctx.rotate(-.3)
        ctx.rect(-1000, 0, 5000,this.width[0]);
        ctx.clip()
        ctx.rect(-1000, 0, 5000,9000);
        ctx.fillStyle = "#1f1f1f"
        ctx.fill();
        ctx.rotate(.3)
        this.game.draw.Text("Yet Another 2d Platformer",200,150)
        this.game.draw.Text("Press W To Start",200,250)


    }
}