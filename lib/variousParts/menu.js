
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

export class Menu{
    game
    constructor(game){
        this.game = game
    }

    width = [700,0,0]
    alpha = 3
    preTick(){

    }
    tick(){
        this.draw()
        if(this.game.state=="game"){
            this.width[0]=this.width[0]*.9
            this.alpha=this.alpha*.95
        }
        if(this.game.state=="menu"){
            this.width[0]=(this.width[0]*4+700)/5
            this.alpha=(this.alpha*6+.6)/7
            if(kd.W.isDown()){
                this.game.state="game"
            }
        }
    }
    draw(){
        ctx.globalAlpha=this.alpha
        ctx.rect(0, 0, 5000,5000);
        ctx.fillStyle = "#111"
        ctx.fill();
        ctx.globalAlpha=1
        
        ctx.beginPath();
        ctx.rotate(-Math.min(this.alpha/2,this.alpha/4+.2))
        ctx.rect(-1000, 0, 5000,this.width[0]);
        ctx.clip()
        ctx.rect(-1000, 0, 5000,9000);
        ctx.fillStyle = "#1f1f1f"
        ctx.fill();
        ctx.rotate(Math.min(this.alpha/1.5,this.alpha/2.5+.2))
        this.game.draw.Text("Yet Another 2d Platformer",200,150)
        this.game.draw.Text("Press W To Start",200,250)


    }
}