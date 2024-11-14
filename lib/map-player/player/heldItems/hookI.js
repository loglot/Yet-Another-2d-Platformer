export class Hook {
    x=[0,0]
    y=[0,0]
    game
    enabled = false
    constructor(game){
        this.game=game
    }
    execute(){
        this.x[1]=this.game.player.x
        this.x[0]=this.game.player.x
        this.y[1]=this.game.player.y
        this.y[0]=this.game.player.y
        this.enabled=true
    }
    unexecute(){
        this.enabled=false
    }
    tick(){
        this.x[0]=this.game.player.x
        this.y[0]=this.game.player.y
        this.x[1]+=this.game.held.trajectory.x*30
        this.y[1]+=this.game.held.trajectory.y*30
    }
}