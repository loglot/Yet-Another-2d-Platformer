export class Camera{
    game
    x = 0
    y = 0
    velX = 0
    velY = 0
    width = 2514
    height = 1377
    rotation = 0
    velR = 0
    zoom = 1
    movementFactor=10 // bigger means slower
    constructor(game){
        this.game= game
    }
    tick(){
        // this.x+=this.velX
        // this.y+=this.velY
        // this.rotation+=this.velR
        // this.velY*=.95
        // this.velR*=.95
        this.velX += (-(this.x+this.width/2)+this.game.player.x)/this.movementFactor
        this.velX*=.70
        this.x+=this.velX
        this.velY += (-(this.y+this.height/2)+this.game.player.y)/this.movementFactor
        this.velY*=.70
        this.y+=this.velY
        document.getElementById("debug").innerHTML = `${this.game.player.x}, ${this.x}`;
    }

    transform(ctx){
        // ctx.translate(this.width/2,this.height/2)
        // ctx.rotate(this.rotation/180)
        // ctx.translate(-this.width/2,-this.height/2)
        ctx.translate(-this.x, -this.y)
    }
    undoTransform(ctx){
        ctx.translate(this.x, this.y)
        // ctx.translate(this.width/2,this.height/2)
        // ctx.rotate(-this.rotation/180)
        // ctx.translate(-this.width/2,-this.height/2)

    }
}