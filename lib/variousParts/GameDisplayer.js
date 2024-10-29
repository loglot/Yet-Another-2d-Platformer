
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

export class Display{
    game
    constructor(gane){
        this.game=gane
    }
    tick(){
        this.game.draw.Rect(0,0,10000,10000,"white")

        ctx.translate(this.game.camera.x, this.game.camera.y)
        this.game.draw.Rect(750,750,100,100)
        this.game.draw.Rect(0,0,100,100)
        ctx.translate(-this.game.camera.x, -this.game.camera.y)
    }
}