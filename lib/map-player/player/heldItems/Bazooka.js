export class Bazooka{
    game
    x = 0
    y = 0
    velX = 0
    velY = 0
    cooldown = 100
    reload = 0
    enabled = false
    visibility = false
    speed = 50
    explodeState = false
    explodeR = 0
    explodeA = 0
    explodeX = 0
    explodeY = 0
    threshold = 0
    cooldownA = 0
    trajectory = new Object()
    playerTraj = {x:0,y:0}
    constructor(game){
        this.game = game
    }
    summon(){
        if(this.reload < 1){
            this.x = this.game.player.x
            this.y = this.game.player.y
            this.visibility = true

            this.trajectory.x=(this.game.held.trajectory.x*1)
            this.trajectory.y=(this.game.held.trajectory.y*1)

            this.reload = this.cooldown
        
            this.velX = this.trajectory.x
            this.velY = this.trajectory.y

            // this.game.audio.bazookaFireSound()
            this.cooldownA = 15
        }
    }

    tick(){
        this.game.debug.add(this.x+":"+this.y)
        this.x += this.velX * this.speed
        this.y += this.velY * this.speed
        this.velY += .05
        // this.colideAll(this.game.map.ground)
        this.colide()
        this.reload--
        if(this.reload == 0) {
            // this.game.audio.bazookaReloadSound()
            console.log("reload")
        }
        if(this.explodeState == true){
            this.explodeR += 30
            this.explodeA -= .05
        }
        if(this.explodeA > 0){
            this.destroy()
        }
        this.cooldownA -= .1
    }

            
        
    

    colide(){
        if(Math.round(this.x/50)<0||Math.round(this.x/50)>this.game.map.mapBuffer.length){return}
        if(this.visibility&&(this.game.map.mapBuffer[Math.round(this.x/50)][Math.round(this.y/50)]==1||this.game.map.mapBuffer[Math.round(this.x/50)][Math.round(this.y/50)]==4)){
            this.visibility = false
            this.explode()
        }
    }

    destroy(){
        const xRange=[Math.max(Math.round(this.x/50-this.explodeR/100),0),Math.min(Math.round(this.x/50+this.explodeR/100),this.game.map.mapBuffer.length)]
        const yRange=[Math.round(this.y/50-this.explodeR/100),Math.round(this.y/50+this.explodeR/100)]
        this.velX = 0
        this.velY = 0
        for(let x = xRange[0]; x<=xRange[1];x++){
            for(let y = yRange[0]; y<=yRange[1];y++){
                if(this.game.map.mapBuffer[x][y]==4){
                    this.game.map.mapBuffer[x][y]=0
                }
            }
        }
    }

    async explode() {
        const diffX = (this.game.player.x) - (this.x);
        const diffY = (this.game.player.y) - (this.y); 
        const distance = (diffX ** 2 + diffY ** 2) ** 0.5;

        this.playerTraj.y = diffY / distance;
        this.playerTraj.x = diffX / distance;

        const closeness = (Math.max(1000 / (Math.max(distance, 150)/5)) * 2) < 9 ? 0 : (Math.max(1000 / (Math.max(distance, 150)/5)) * 2, 30)

        this.game.player.velX += this.playerTraj.x * closeness * 2
        if(closeness > 20){
            this.game.player.velY = this.playerTraj.y * closeness
        }
        this.game.player.friction = .99
        this.game.player.frictionInertia = 50;
        this.game.player.velY += this.playerTraj.y * closeness
        
        // this.game.audio.bazookaHitSound()
        console.log(closeness)

        this.explodeState = true
        this.explodeX = this.x
        this.explodeY = this.y
        this.explodeA = 1
        this.explodeR = 0


    }

}