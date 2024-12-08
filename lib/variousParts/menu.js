
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

export class Menu{
    game
    constructor(game){
        this.game = game
    }

    width = [700,0,0]
    alpha = 1
    rotation = 3
    alphaTarget = 1
    preTick(){

    }
    tick(){
        var axes = []
        axes=this.game.controller.controllerCheck("axes")
        var buttons = []
        buttons=this.game.controller.controllerCheck("buttons")
        this.draw()
        if(this.game.state=="game"){
            this.width[0]=this.width[0]*.9
            this.rotation=this.rotation*.95
            this.alpha=this.alpha*.95
        }
        if(this.game.state=="menu"){
            this.width[0]=(this.width[0]*4+700)/5
            this.rotation=(this.rotation*6+.6)/7
            this.alpha=(this.alpha*6+this.alphaTarget)/7
            if(kd.W.isDown()||buttons[0]){
                this.game.state="game"
            }
            if(kd.R.isDown()){
                this.width = [700,0,0]
                this.alpha = 3
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
        ctx.rotate(-Math.min(this.rotation/2,this.rotation/4+.2))
        ctx.rect(-1000, 0, 5000,this.width[0]);
        ctx.clip()
        ctx.rect(-1000, 0, 5000,9000);
        ctx.fillStyle = "#1f1f1f"
        ctx.fill();
        ctx.rotate(Math.min(this.rotation/1.5,this.rotation/2.5+.2))
        this.game.draw.Text("Yet Another 2d Platformer",200,150)
        this.game.draw.Text("Press W To Start",200,250)


    }
}