 
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");
 
 export class Background{
    game
    bgElements = []
    velX=0
    velY=-3
    constructor(game){
        this.game=game
        let ParticleCount = 50
        for(let i = 0; i<ParticleCount;i++){
                this.bgElements[i] = this.particle(Math.random()*2800,Math.random()*2000,(-i+ParticleCount)/(ParticleCount/5)+1.1)

        }
    }
    particle(x,y,velX){
        return {x:x,y:y,distance:velX}
    }
    draw(){
        this.game.display.resizeCanvasForWindowSize(canvas, ctx)
        this.game.draw.Rect(0,0,10000,10000,"rgb(167,199,216)")
        for(let i = 0; i<this.bgElements.length;i++){

            this.game.draw.Circle(this.bgElements[i].x,this.bgElements[i].y,(100+this.bgElements.length*7)-i*7,"#fff")
            this.game.draw.Rect(0,0,10000,10000,"rgba(167,199,216,.05)")
            this.bgElements[i].x-=(this.game.camera.velX+this.velX)/this.bgElements[i].distance
            this.bgElements[i].y-=(this.game.camera.velY+this.velY)/this.bgElements[i].distance
            if(this.bgElements[i].x>2800){
                this.bgElements[i].x=-500
                this.bgElements[i].y=Math.random()*1300
            }
            if(this.bgElements[i].x<-500){
                this.bgElements[i].x=2800
                this.bgElements[i].y=Math.random()*1300
            }
            if(this.bgElements[i].y>2000){
                this.bgElements[i].y=-500
                this.bgElements[i].x=Math.random()*2500
            }
            if(this.bgElements[i].y<-500){
                this.bgElements[i].y=2000
                this.bgElements[i].x=Math.random()*2500
            }
            // this.game.debug.add(this.bgElements[i].x+":"+this.bgElements[i].y)
        }
        this.game.draw.Rect(0,0,10000,10000,"rgba(167,199,216,.5)")
    }
    tick(){
        this.draw()
    }
 }