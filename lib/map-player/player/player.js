import { Hitbox } from "../hitbox.js"

export class Player{
    game
    x = 438  
    y = 509
    velX = 0
    velY = 0
    groundFriction = .90
    airFriction = .98
    rotation = 0
    velR = 0
    speed=1
    WLastFrame = false
    impactLastFrame=true
    jumpHeight=21
    playerHitbox = new Array();
    constructor(game){
        this.game= game
        this.#buildHitbox(-25, -75, 50, 125)
    }

    #buildHitbox(x, y, width, height) {
        this.playerHitbox[0] = new Hitbox(x + 5, y + (height - 10), width - 10, 10); // bottom of hitbox
        this.playerHitbox[1] = new Hitbox(x + 5, y, width - 10, 10) // top of hitbox
        this.playerHitbox[2] = new Hitbox(x, y + 50, 10, height - 100) // small left of hitbox
        this.playerHitbox[3] = new Hitbox(x + width - 10, y + 50, 10, height - 100) // small right of hitbox
        this.playerHitbox[4] = new Hitbox(x, y + 30, 10, height - 60) // left of hitbox
        this.playerHitbox[5] = new Hitbox(x + width - 10, y + 30, 10, height - 60) // right of hitbox

        this.playerHitbox[100] = new Hitbox(x, y, width, height)
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
            this.velY -= this.jumpHeight
            this.WLastFrame = true 
        } else {
            this.WLastFrame = false 
        }
        
            

        this.velY+=0.5
        this.x+=this.velX
        this.y+=this.velY
        this.velX*=this.airFriction
        
        var xRange=[
            0, 
            this.game.map.ground.mapBuffer.length]
            this.game.debug.add("works")
        
        for(let x = xRange[0];x < xRange[1]; x++){
            var yRange=[
                0, 
                this.game.map.ground.mapBuffer[x].length]

            for(let y = xRange[0];y < yRange[1]; y++){

                var colide = this.collisionCheck(0, x, y)
                if(colide[0]&& colide[1]==1){
                    this.y=y*100-50
                    this.velY=0
                }


            }
        }
        // if(this.y>550){
        //     this.y=550
        //     this.velY=0
        //     this.velX*=this.groundFriction
        //     if(!this.impactLastFrame){
        //         this.game.camera.ImpactCameraShake()
        //     }
        //     this.impactLastFrame = true
        // } else {
        //     this.impactLastFrame = false
        // }


    }













    collisionCheck(part, x, y) {

        var type = false
        var hit = false
        if  (  
        ((  this.playerHitbox[part].y +this.y >= y*100                                                                &&
            this.playerHitbox[part].y +this.y <= y*100 + 100)                                                         || 
        (   this.playerHitbox[part].y + this.playerHitbox[part].height +this.y >= y*100                               &&
            this.playerHitbox[part].y + this.playerHitbox[part].height +this.y <= y*100 + 100))                       &&
        ((  this.playerHitbox[part].x +this.x >= x*100                                                                &&
            this.playerHitbox[part].x +this.x <= x*100 + 100)                                                         ||
        (   this.playerHitbox[part].x + this.playerHitbox[part].width +this.x >= x*100                                &&
            this.playerHitbox[part].x + this.playerHitbox[part].width +this.x <= x*100 + 100                          ))
            ) {
            type = this.game.map.ground.mapBuffer[x][y]
            hit = true
        }

        return ([hit, type]);
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