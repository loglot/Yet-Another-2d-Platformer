export class Camera{
    game
    x = 0
    y = 0
    velX = 0
    velY = 0
    width = 0
    height = 0
    rotation = 0
    zoom = 1
    constructor(game){
        this.game= game
    }
    tick(){
        this.x+=this.velX
        this.y+=this.velY
        this.velX*=.95
        this.velY*=.95
    }

    transform(ctx){
        ctx.translate(this.x, this.y)

    }
    undoTransform(ctx){
        ctx.translate(-this.x, -this.y)

    }
}