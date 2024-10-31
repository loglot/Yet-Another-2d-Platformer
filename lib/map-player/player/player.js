export class Player{
    game
    x = 438  
    y = 509
    velX = 0
    velY = 0
    rotation = 0
    velR = 0
    speed=1
    WLastFrame = false
    constructor(game){
        this.game= game
    }
    tick(){
        //this.moveNoClip()
        this.move()

    }
    move(){
        if(kd.D.isDown()){
            this.velX += this.speed
        }
        if(kd.A.isDown()){
            this.velX -= this.speed
        }
        if(kd.W.isDown()){
        if(!this.WLastFrame)
            this.velY -= 20
            this.WLastFrame = true 
        } else {
            this.WLastFrame = false 
        }
        
            

        this.velY+=.5
        this.x+=this.velX
        this.y+=this.velY
        if(this.y>509){
            this.y=509
            this.velY=0
            this.game.camera.ImpactCameraShake()
        }


    }




    moveNoClip(){
        if(kd.A.isDown()){
            this.velX--
        }
        if(kd.S.isDown()){
            this.velY++
        }
        if(kd.D.isDown()){
            this.velX++
        }
        if(kd.W.isDown()){
            this.velY--
        }

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