export class Hook {
    x=[0,0]
    y=[0,0]
    game
    enabled = false
    trajectory = {x:0,y:0}
    constructor(game){
        this.game=game
    }
    execute(){
        this.x[1]=this.game.player.x
        this.x[0]=this.game.player.x
        this.y[1]=this.game.player.y
        this.y[0]=this.game.player.y
        this.enabled=true
        this.trajectory.x=this.game.held.trajectory.x*30
        this.trajectory.y=this.game.held.trajectory.y*30
    }
    unexecute(){
        this.enabled=false
    }
    tick(){
        this.x[0]=this.game.player.x
        this.y[0]=this.game.player.y
        this.x[1]+=this.trajectory.x
        this.y[1]+=this.trajectory.y
        if(this.enabled){
            this.colide()
        }
    }

    colide(){
        var grid={
            x:
            Math.round((this.x[1]-25)/50),
            y:
            Math.round((this.y[1]-25)/50)}

        
        
        var colision = this.colideCheck(grid.x, grid.y, this.game.map.mapBuffer)
        // this.game.debug.add(colision+"a")
        if(colision==1){
            this.trajectory={x:0,y:0}
            this.x[1]=(grid.x*50)+25
            this.y[1]=(grid.y*50)+25
        }
        if(colision==2){
            this.trajectory={x:0,y:0}
            this.enabled=false
        }

        
    }

    colideCheck(x,y,map){
        return map[x][y]
    }
}