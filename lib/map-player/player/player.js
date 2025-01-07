import { Hitbox } from "../hitbox.js"

export class Player{
    game
    x = 2900
    y = 2050
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
    Respawn=[2900,2050]
    jumpTimer=0
    coyoteTimeSet=5
    playerHitbox = new Array();
    horizontalWallJump=40
    motion = false
    wallJump = {left:false,right:false,lastDone:"ground",multiplication:1}
    Held = new Map()
    ELastFrame
    QLastFrame
    alive = true
    deathOrbs=[]
    deathOrbR=25
    collectOrbs=[]
    collectOrbR=[]
    collectOrbSpeed=[]
    deathAnimPart=1
    animTimer=0
    deathCount=0
    avgVelY = 0
    constructor(game){
        this.game= game
        this.#buildHitbox(-25, -75, 50, 125)

        for(let i = 0; i<8; i++){
            this.deathOrbs[i] = this.orb(0,0)
        }

        this.Held.set("hook",false)
        this.Held.set("pickaxe",false)
        this.Held.set("bazooka",false)
        this.Held.set("shotgun",false)
        this.Held.set("dash",false)
        this.Held.set("portal",false)

    }
    orb(x,y){
        return{x:x,y:y}
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
            if(this.alive){

                this.move()
                this.holder()
            }
        }
        this.animateCollect()

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
        if(kd.Q.isDown()){
            if(!this.QLastFrame){
                this.game.held.down()
            }
            this.QLastFrame = true
        }else{
            this.QLastFrame = false
        }
    }


















    async die(){
        this.animTimer=120
        this.deathOrbR=25
        this.alive=false
        this.deathAnimPart=1
        this.deathOrbs[8]=10
        this.velX=0
        this.velY=0
        this.deathCount++

        for(let i = 0; i<8; i++){
            this.deathOrbs[i].x=this.x
            this.deathOrbs[i].y=this.y
        }
    }


    move(){
        var axes = []
        axes=this.game.controller.controllerCheck("axes")
        var buttons = []
        buttons=this.game.controller.controllerCheck("buttons")
        this.speed=((this.speed*7)+(this.targetSpeed*1))/8
        this.motion=false
        if(kd.D.isDown()||axes[0]>.5){
            this.velX += this.speed
            this.motion=true
            this.friction=(this.airFriction+this.friction*this.frictionInertia)/(this.frictionInertia+1)
            this.frictionInertia*=.9
        }
        if(kd.R.isDown()||buttons[8]){
            this.die()
        }
        if(kd.A.isDown()||axes[0]<-.5){
            this.velX -= this.speed
            this.motion=true
            this.friction=(this.airFriction+this.friction*this.frictionInertia)/(this.frictionInertia+1)
            this.frictionInertia*=.9
        }
        if(kd.S.isDown()|| axes[1]>=.5){
            this.velY=Math.max(this.velY, 0)
            
            this.avgVelY += 4
            this.velY += 1
        }
        this.jumpTimer--
        if(kd.W.isDown()||buttons[0]){
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

        
        this.avgVelY = (this.avgVelY + this.velY + Math.abs(this.velX))/3


    }

    colide(){
        var axes = []
        axes=this.game.controller.controllerCheck("axes")
        // var xRange=[
        //     Math.max(0,Math.round(this.x/50)-5), 
        //     Math.min(this.game.map.mapBuffer.length,Math.round(this.x/50)+5)
        //     ]
        if(Math.abs(this.velY)>30){
            var motion = true
            var vely = this.velY
        } else {
            var motion = false
        }
        var xRange=[
            Math.max(Math.round(this.x/50)-2, 0), 
            Math.min(Math.round(this.x/50)+1,this.game.map.mapBuffer.length)
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
                if(colide[0]&& ((colide[1] >= 1 && colide[1] < 2) || colide[1]==4)){
                    this.x=x*50+75
                    this.velX=0
                    if((kd.A.isDown()||axes[0]<-.5) && this.velY>0){
                        this.velY*=.995
                    }
                    this.wallJump.left = true
                }
                var colide = this.collisionCheck(3, x, y)
                if(colide[0]&& ((colide[1] >= 1 && colide[1] < 2) || colide[1]==4)){
                    this.x=x*50-25
                    this.velX=0
                    if((kd.D.isDown()||axes[0]>.5) && this.velY>0){
                        this.velY*=.995
                    }
                    this.wallJump.right = true
                }

                var colide = this.collisionCheck(0, x, y)
                if(colide[0]&& ((colide[1] >= 1 && colide[1] < 2) || colide[1]==4)){
                    if(motion){
                         this.game.camera.ImpactCameraShake((Math.random()-.5)*((/*Math.abs()+*/Math.abs(vely/5)))/*-this.velX/3*/)
                    }
                    this.y=y*50-50
                    this.velY=0
                    this.jumpTimer=this.coyoteTimeSet   
                    this.wallJump.lastDone="ground"
                    this.game.held.dash.reset()
                }
                var colide = this.collisionCheck(1, x, y)
                if(colide[0]&& ((colide[1] >= 1 && colide[1] < 2) || colide[1]==4)){
                    if(motion){
                         this.game.camera.ImpactCameraShake((Math.random()-.5)*((/*Math.abs()+*/Math.abs(vely/5)))/*-this.velX/3*/)
                    }
                    this.y=y*50+125
                    this.velY=0
                }
                var colide = this.collisionCheck(4, x, y)
                if(colide[0]&& ((colide[1] >= 1 && colide[1] < 2) || colide[1]==4)){
                    this.x=x*50+75
                    this.velX=0
                }
                var colide = this.collisionCheck(5, x, y)
                if(colide[0]&& ((colide[1] >= 1 && colide[1] < 2) || colide[1]==4)){
                    this.x=x*50-25
                    this.velX=0
                }
                var colide = this.collisionCheck(100, x, y)
                if(colide[0]&& colide[1]==2){
                    this.die()
                }
                if(colide[0]&& colide[1]>=5&&colide[1]<6){
                    this.Respawn[0]=this.x
                    this.Respawn[1]=this.y
                    if(colide[1]==5.1&&!this.Held.get("hook")){
                        this.Held.set("hook",true)
                        this.game.held.selected=0
                        this.game.held.makeImg()
                        this.animateCollectInit()
                    }
                    if(colide[1]==5.2&&!this.Held.get("pickaxe")){
                        this.Held.set("pickaxe",true)
                        this.game.held.selected=1
                        this.game.held.makeImg()
                        this.animateCollectInit()
                    }
                    if(colide[1]==5.3&&!this.Held.get("bazooka")){
                        this.Held.set("bazooka",true)
                        this.game.held.selected=2
                        this.game.held.makeImg()
                        this.animateCollectInit()
                    }
                    if(colide[1]==5.4&&!this.Held.get("shotgun")){
                        this.Held.set("shotgun",true)
                        this.game.held.selected=3
                        this.game.held.makeImg()
                        this.animateCollectInit()
                    }
                    if(colide[1]==5.5&&!this.Held.get("dash")){
                        this.Held.set("dash",true)
                        this.game.held.selected=4
                        this.game.held.makeImg()
                        this.animateCollectInit()
                    }
                    if(colide[1]==5.6&&!this.Held.get("portal")){
                        this.Held.set("portal",true)
                        this.game.held.selected=5
                        this.game.held.makeImg()
                        this.animateCollectInit()
                    }
                }
                if(colide[0]&& colide[1]>=6&&colide[1]<7){
                    this.game.background.ChangeColor(Math.round((colide[1]-6.1)*10))
                }
                if(colide[0]&& colide[1]>=100&&colide[1]<200){
                    this.manageTriggers(Math.round((colide[1]-100)*100))
                }
                if(colide[0]&& colide[1]==3){
                    this.Respawn[0]=this.x
                    this.Respawn[1]=this.y
                }
            }
        }
    }


    manageTriggers(triggerType){
        this.game.debug.add(triggerType)
        if(triggerType<100){
            if(triggerType>this.game.map.Maps.length){

                this.game.debug.Map++
                if(this.game.debug.Map==this.game.map.Maps.length){
                    this.game.debug.Map=0
                }
                this.game.map.mapBuffer=this.game.map.Maps[this.game.debug.Map]
    
            } else {
                this.game.debug.Map = triggerType
                this.game.map.mapBuffer=this.game.map.Maps[this.game.debug.Map]
            }
        }
    }











    collisionCheck(part, x, y) {

        var type = false
        var hit = false
        var directional= new Map()
        
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
        var axes = []
        axes=this.game.controller.controllerCheck("axes")
        this.motion=false
        if(kd.A.isDown()||axes[0]<-.5){
            this.velX-=2
            this.motion=true
        }
        if(kd.S.isDown()||axes[1]>.5){
            this.velY+=2
            this.motion=true
        }
        if(kd.D.isDown()||axes[0]>.5){
            this.velX+=2
            this.motion=true
        }
        if(kd.W.isDown()||axes[1]<-.5){
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


    }
    drawPlayer(){
        if(this.alive){

            for(let i = 0; i<this.collectOrbs.length; i++){
                let idev8 = Math.floor(i/8)
                this.game.draw.Circle(this.collectOrbs[i].x+this.x,this.collectOrbs[i].y+this.y,Math.max(this.collectOrbR[idev8]+5,0),"#33363f")
                this.game.draw.Circle(this.collectOrbs[i].x+this.x,this.collectOrbs[i].y+this.y,Math.max(this.collectOrbR[idev8],0),"#fff")
            }
            if (this.avgVelY > 20){
                this.game.draw.Bean(this.x , this.y , 50 + (20/2), 100 - 20, "#afbfaf") 
            } else if (this.avgVelY < -20){
                this.game.draw.Bean(this.x , this.y , 50 + (-20/2), 100 + 20, "#afbfaf") 
            } else{
                this.game.draw.Bean(this.x , this.y , 50 + (this.avgVelY/2), 100 - this.avgVelY, "#afbfaf") 
            }
            // this.game.draw.Bean(this.x,this.y,50,100, "#afbfaf")
        }
        //this.drawHitbox()
    }
    drawDeath(){
        if(!this.alive){
        
            this.deathAnimate()
            for(let i = 0; i<8; i++){
                this.game.draw.Circle(this.deathOrbs[i].x,this.deathOrbs[i].y,Math.max(this.deathOrbR+5,0),"#33363f")
                this.game.draw.Circle(this.deathOrbs[i].x,this.deathOrbs[i].y,Math.max(this.deathOrbR,0),"#afbfaf")
            }
        }
    }

    deathTick(){

        if(this.animTimer==60){
            this.deathAnimPart=2

            this.deathOrbs[8]=0

            let posStorage={x:0,y:0}
            posStorage.x=this.x
            posStorage.y=this.y
            this.x=this.Respawn[0]
            this.y=this.Respawn[1]
            for(let i = 0; i<8; i++){
                this.deathOrbs[i].x=this.x-(posStorage.x-this.deathOrbs[i].x)
                this.deathOrbs[i].y=this.y-(posStorage.y-this.deathOrbs[i].y)
            }
        }
        if(this.animTimer==0){

            this.alive=true
        }
    }
    deathAnimate(){
        this.animTimer--
        this.deathTick()

        var speed = 1.5

        if(this.deathAnimPart==1){

            this.deathOrbs[8]*=.97
            var set=this.deathOrbs[8]
        }
        if(this.deathAnimPart==2){

            this.deathOrbs[8]=((this.deathOrbs[8]*50)-10)/51
            var set=this.deathOrbs[8]
        }

        for(let i = 0; i<8; i++){
            let xChange = i==0||i==1||i==5 ? set :i==2||i==3||i==7 ? -set : 0 
            let yChange = i==1||i==3||i==4 ? set :i==5||i==6||i==7 ? -set : 0 
            let xDir = i==2||i==5||i==6||i==7 ? set:-set //67
            let yDir = i==0||i==5||i==6||i==1 ? set:-set
            let devision = this.isEven(this.deathCount)?8:13

            this.deathOrbs[i].x=this.deathOrbs[i].x+xChange*speed + (Math.sin(this.animTimer/devision)*xDir)
            this.deathOrbs[i].y=this.deathOrbs[i].y+yChange*speed + (Math.cos(this.animTimer/devision)*yDir)
        }

        if(this.deathAnimPart==1){
            this.deathOrbR-=.5
        }else{
            this.deathOrbR+=.5
        }
    }

    isEven(n) {
        n = Number(n);
        return n === 0 || !!(n && !(n%2));
      }
      
    isOdd(n) {
        return isEven(Number(n) + 1);
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
    animateCollectInit(){
        var set = 550
        for(let i = 0; i < 8; i++){
            let xChange = i==0||i==1||i==5 ? set :i==2||i==3||i==7 ? -set : 0 
            let yChange = i==1||i==3||i==4 ? set :i==5||i==6||i==7 ? -set : 0 
            this.collectOrbs.push(this.orb(xChange,yChange))
        }
        let idev8 = Math.floor(this.collectOrbs.length/8)
        this.collectOrbR[idev8-1]=0
        this.collectOrbSpeed[idev8-1]=0
        

    }
    animateCollect(){
        var set = 5
        var speed = -.01
        var growSpeed = .3
        var remove=false
        for(let ii = 0; ii<this.collectOrbs.length; ii++){
            let idev8 = Math.floor(ii/8)
            let i = ii-(idev8*8)
            let xChange = i==0||i==1||i==5 ? set :i==2||i==3||i==7 ? -set : 0 
            let yChange = i==1||i==3||i==4 ? set :i==5||i==6||i==7 ? -set : 0 
            let xDir = i==2||i==5||i==6||i==7 ? set:-set //67
            let yDir = i==0||i==5||i==6||i==1 ? set:-set
            let devision = 3.7

            this.collectOrbs[ii].x=this.collectOrbs[ii].x+xChange*this.collectOrbSpeed[idev8]+(Math.sin(this.collectOrbSpeed[idev8]*devision)*xDir)
            this.collectOrbs[ii].y=this.collectOrbs[ii].y+yChange*this.collectOrbSpeed[idev8]+(Math.sin(this.collectOrbSpeed[idev8]*devision)*yDir)
            if(Math.floor(this.collectOrbs[ii].y/50)==0&&Math.floor(this.collectOrbs[ii].x/50)==0){
                remove=true
            }
            this.collectOrbR[idev8]-=this.collectOrbSpeed[idev8]/(8*2.5)
            
        }
        for(let ii = 0; ii<this.collectOrbSpeed.length; ii++){
            this.collectOrbSpeed[ii] +=speed

        }
        if(remove==true){
            this.collectOrbs.splice(0,8)
            this.collectOrbR.splice(0,1)
        }
    }
}