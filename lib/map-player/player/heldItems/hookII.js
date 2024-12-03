export class Pickaxe {
    x=[0,0]
    y=[0,0]
    game
    enabled = false
    anchored = false
    trajectory = {x:0,y:0}
    friction=.95
    storage={friction:{ground:0,air:0}}
    constructor(game){
        this.game=game
        this.storage.friction.ground=this.game.player.groundFriction
        this.storage.friction.air=this.game.player.airFriction
    }
    execute(){
        this.x[1]=this.game.player.x
        this.x[0]=this.game.player.x
        this.y[1]=this.game.player.y
        this.y[0]=this.game.player.y
        this.enabled=true
        this.trajectory.x=(this.game.held.trajectory.x*60)
        this.trajectory.y=(this.game.held.trajectory.y*60)
    }
    unexecute(){
        this.enabled=false
        this.anchored=false
        this.game.player.airFriction = this.storage.friction.air
        this.game.player.groundFriction = this.storage.friction.ground
    }
    tick(){
        this.x[0]=((this.game.player.x+this.game.held.trajectory.x*60))/1
        this.y[0]=((this.game.player.y+this.game.held.trajectory.y*100))/1
        if(!this.anchored){
            this.velX=(-this.x[1]+(this.x[0]+this.game.held.trajectory.x * 150))/3
            this.velY=(-this.y[1]+(this.y[0]+this.game.held.trajectory.y * 150))/3
            this.x[1]+=this.velX
            this.y[1]+=this.velY
        }
        if(this.enabled&&!this.anchored){
            this.colide()
        }
        if(this.anchored){

            this.game.player.velX = (-(this.x[0] - (this.x[1] - (this.game.held.trajectory.x * 150))) + this.game.player.velX * 4) / 7 //this.game.player.velX + ((this.x1 - (this.x2 + this.game.camera.x)) / 70)
            this.game.player.velY = (-(this.y[0] - (this.y[1] - (this.game.held.trajectory.y * 150))) + this.game.player.velY * 4) / 7 //this.game.player.velY + ((this.y1 - (this.y2 + this.game.camera.y)) / 130) + .1
        
        }
        
    }

    colide(){
        var grid={
            x:
            Math.round((this.x[1]-25)/50),
            y:
            Math.round((this.y[1]-25)/50)}

            if(grid.x<0||grid.x>this.game.map.mapBuffer.length){return}

        
        
            if(grid.x<this.game.map.mapBuffer.length){
        var colision = this.colideCheck(grid.x, grid.y, this.game.map.mapBuffer)
        // this.game.debug.add(colision+"a")
            if(colision==1 || colision==4){
                this.trajectory={x:0,y:0}
                this.x[1]=(grid.x*50)+25
                this.y[1]=(grid.y*50)+25
                this.anchored=true
                this.game.player.airFriction = .95
                this.game.player.groundFriction = .95
            }
            if(colision==2){
                this.trajectory={x:0,y:0}
                this.enabled=false
                this.anchored=false
            }
        }

        
    }

    colideCheck(x,y,map){
        return map[x][y]
    }
}