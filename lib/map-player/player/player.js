export class Player{
    game
    x = 0
    y = 0
    velX = 0
    velY = 0
    rotation = 0
    velR = 0
    constructor(game){
        this.game= game
    }
    tick(){
        this.x+=this.velX
        this.y+=this.velY
        this.rotation+=this.velR
        this.velX*=.95
        this.velY*=.95
        this.velR*=.95

    }
    drawPlayer(){
        this.game.draw.Bean(this.x,this.y,50,100, "#afbfaf")
    }
}