import { Hitbox } from "../hitbox.js"

export class Player{
    game
    x = 2877
    y = 2038
    velX = 0
    velY = 0
    groundFriction = .80
    airFriction = .90
    wallJumpFriction = .99
    frictionInertia = 50
    friction=this.groundFriction
    rotation = 0
    velR = 0
    speed=2
    targetSpeed=2
    WLastFrame = false
    impactLastFrame=true
    jumpHeight=16
    Float=.2
    Respawn=[438,509]
    jumpTimer=0
    coyoteTimeSet=5
    playerHitbox = new Array();
    horizontalWallJump=40
    motion = false
    wallJump = {left:false,right:false,lastDone:"ground",multiplication:1}
    Held = new Map()
    ELastFrame
    constructor(game){
        this.game= game
        this.#buildHitbox(-25, -75, 50, 125)

        this.Held.set("hook",true)
        this.Held.set("pickaxe",false)
        this.Held.set("bazooka",false)
        this.Held.set("shotgun",false)
        this.Held.set("dash",false)
        this.Held.set("portal",false)

    }

    #buildHitbox(x, y, width, height) {
        this.playerHitbox[0] = new Hitbox(x + 5, y + (height - 10), width - 10, 10); // bottom of hitbox
        this.playerHitbox[1] = new Hitbox(x + 10, y, width - 20, 10) // top of hitbox
        this.playerHitbox[2] = new Hitbox(x, y + 50, 10, height - 100) // small left of hitbox
        this.playerHitbox[3] = new Hitbox(x + width - 10, y + 50, 10, height - 100) // small right of hitbox
        this.playerHitbox[4] = new Hitbox(x, y + 20, 10, height - 40) // left of hitbox
        this.playerHitbox[5] = new Hitbox(x + width - 10, y + 20, 10, height - 40) // right of hitbox

        this.playerHitbox[100] = new Hitbox(x+2, y+2, width-4, height-5)
    }














    tick(){
        if(this.game.debug.noclip){

            this.moveNoClip()
        }else {

            this.move()
            this.holder()
        }

    }

    holder(){
        if(kd.E.isDown()){
            if(!this.ELastFrame){
                this.game.held.up()
            }
            this.ELastFrame = true
        }else{
            this.ELastFrame = false
        }
    }





















    move(){
        this.speed=((this.speed*7)+(this.targetSpeed*1))/8
        this.motion=false
        if(kd.D.isDown()){
            this.velX += this.speed
            this.motion=true
            this.friction=(this.airFriction+this.friction*this.frictionInertia)/(this.frictionInertia+1)
            this.frictionInertia*=.9
        }
        if(kd.A.isDown()){
            this.velX -= this.speed
            this.motion=true
            this.friction=(this.airFriction+this.friction*this.frictionInertia)/(this.frictionInertia+1)
            this.frictionInertia*=.9
        }
        if(kd.S.isDown()){
            this.velY=Math.max(this.velY, 0)
            
            this.velY += 1
        }
        this.jumpTimer--
        if(kd.W.isDown()){
            this.velY=Math.min(this.velY, 20)
            this.velY-= this.Float
            if(!this.WLastFrame){
                if(this.jumpTimer>=1){

                    this.velY -= this.jumpHeight
                }else{
                    if(this.wallJump.left){
                        if(this.wallJump.lastDone!="left"){this.wallJump.multiplication=1}
                        this.wallJump.lastDone="left"
                        this.velY=Math.min(0, this.velY)
                        this.velY -= this.jumpHeight*this.wallJump.multiplication
                        this.velX += this.horizontalWallJump
                        this.wallJump.multiplication*=.8
                        this.friction=this.wallJumpFriction
                        this.frictionInertia=50
                        this.speed=1
                    }
                    if(this.wallJump.right){
                        if(this.wallJump.lastDone!="right"){this.wallJump.multiplication=1}
                        this.wallJump.lastDone="right"
                        this.velY=Math.min(0, this.velY)
                        this.velY -= this.jumpHeight*this.wallJump.multiplication
                        this.velX -= this.horizontalWallJump
                        this.wallJump.multiplication*=.8
                        this.friction=this.wallJumpFriction
                        this.frictionInertia=50
                        this.speed=1
                    }
                }
                this.WLastFrame = true 
            }
        } else {
            this.WLastFrame = false 
        }

        if(!this.motion){
            
            this.friction=(this.groundFriction+this.friction*this.frictionInertia)/(this.frictionInertia+1)
        }

        this.velX*=this.friction
        this.velY+=0.5
        for(let i = 0; i < 50; i++){
            this.x+=this.velX/50
            this.y+=this.velY/50
            this.colide()
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

    colide(){
        // var xRange=[
        //     Math.max(0,Math.round(this.x/50)-5), 
        //     Math.min(this.game.map.mapBuffer.length,Math.round(this.x/50)+5)
        //     ]
        var xRange=[
            Math.round(this.x/50)-2, 
            Math.round(this.x/50)+1
        ]
            
                    this.wallJump.left = false
                    this.wallJump.right = false
        
        for(let x = xRange[0];x < xRange[1]; x++){
            // var yRange=[
            //     Math.max(0,Math.round(this.y/50)-5), 
            //     Math.min(this.game.map.mapBuffer.length,Math.round(this.y/50)+5)
            // ]
            var yRange=[
                Math.round(this.y/50)-2, 
                Math.round(this.y/50)+2
            ]
            for(let y = yRange[0];y < yRange[1]; y++){
                var colide = this.collisionCheck(2, x, y)
                this.game.draw.Rect(x*50,y*50,50,50,"rgba(255,255,255,.01")
                if(colide[0]&& colide[1]==1){
                    this.x=x*50+75
                    this.velX=0
                    if(kd.A.isDown() && this.velY>0){
                        this.velY*=.995
                    }
                    this.wallJump.left = true
                }
                var colide = this.collisionCheck(3, x, y)
                if(colide[0]&& colide[1]==1){
                    this.x=x*50-25
                    this.velX=0
                    if(kd.D.isDown() && this.velY>0){
                        this.velY*=.995
                    }
                    this.wallJump.right = true
                }

                var colide = this.collisionCheck(0, x, y)
                if(colide[0]&& colide[1]==1){
                    this.y=y*50-50
                    this.velY=0
                    this.jumpTimer=this.coyoteTimeSet   
                    this.wallJump.lastDone="ground"
                    this.game.held.dash.reset()
                }
                var colide = this.collisionCheck(1, x, y)
                if(colide[0]&& colide[1]==1){
                    this.y=y*50+125
                    this.velY=0
                }
                var colide = this.collisionCheck(4, x, y)
                if(colide[0]&& colide[1]==1){
                    this.x=x*50+75
                    this.velX=0
                }
                var colide = this.collisionCheck(5, x, y)
                if(colide[0]&& colide[1]==1){
                    this.x=x*50-25
                    this.velX=0
                }
                var colide = this.collisionCheck(100, x, y)
                if(colide[0]&& colide[1]==2){
                    this.x=this.Respawn[0]
                    this.y=this.Respawn[1]
                }
                if(colide[0]&& colide[1]==3){
                    this.Respawn[0]=this.x
                    this.Respawn[1]=this.y
                }


            }
        }
    }











    collisionCheck(part, x, y) {

        var type = false
        var hit = false
        if  (  
        ((  this.playerHitbox[part].y +this.y >= y*50                                                                &&
            this.playerHitbox[part].y +this.y <= y*50 + 50)                                                         || 
        (   this.playerHitbox[part].y + this.playerHitbox[part].height +this.y >= y*50                               &&
            this.playerHitbox[part].y + this.playerHitbox[part].height +this.y <= y*50 + 50))                       &&
        ((  this.playerHitbox[part].x +this.x >= x*50                                                                &&
            this.playerHitbox[part].x +this.x <= x*50 + 50)                                                         ||
        (   this.playerHitbox[part].x + this.playerHitbox[part].width +this.x >= x*50                                &&
            this.playerHitbox[part].x + this.playerHitbox[part].width +this.x <= x*50 + 50                          ))
            ) {
            type = this.game.map.mapBuffer[x][y]
            hit = true
        }

        return ([hit, type]);
    }

    moveNoClip(){
        this.motion=false
        if(kd.A.isDown()){
            this.velX-=2
            this.motion=true
        }
        if(kd.S.isDown()){
            this.velY+=2
            this.motion=true
        }
        if(kd.D.isDown()){
            this.velX+=2
            this.motion=true
        }
        if(kd.W.isDown()){
            this.velY-=2
            this.motion=true
        }

        this.x+=this.velX
        this.y+=this.velY
        this.rotation+=this.velR
        var friction = .7
        if(this.motion){
            friction = .93
        }
        this.velX*=friction
        this.velY*=friction
        this.velR*=friction

        this.game.debug.add("Noclip {}")

    }
    drawPlayer(){
        this.game.draw.Bean(this.x,this.y,50,100, "#afbfaf")
        //this.drawHitbox()
    }

    drawHitbox() {
        this.playerHitbox[100].draw(this.x, this.y , "#909090");

        this.playerHitbox[4].draw(this.x, this.y , "#c0c0c0");
        this.playerHitbox[5].draw(this.x, this.y , "#c0c0c0");
        this.playerHitbox[0].draw(this.x, this.y , "#f0f0f0");
        this.playerHitbox[1].draw(this.x, this.y , "#f0f0f0");
        this.playerHitbox[2].draw(this.x, this.y , "#f0f0f0");
        this.playerHitbox[3].draw(this.x, this.y , "#f0f0f0");
    }
}