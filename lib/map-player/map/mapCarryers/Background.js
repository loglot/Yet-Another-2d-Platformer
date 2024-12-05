 
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");
 
 export class Background{
    game
    bgElements = []
    constructor(game){
        this.game=game
        let ParticleCount = 50
        for(let i = 0; i<ParticleCount;i++){
                this.bgElements[i] = this.particle(Math.random()*2500,Math.random()*1300,(-i+ParticleCount)/(ParticleCount/2)+1.2)

        }
    }
    particle(x,y,velX,velY){
        return {x:x,y:y,velX:velX,velY:velY}
    }
    draw(){
        this.game.display.resizeCanvasForWindowSize(canvas, ctx)
        this.game.draw.Rect(0,0,10000,10000,"rgb(167,199,216)")
        for(let i = 0; i<this.bgElements.length;i++){

            this.game.draw.Circle(this.bgElements[i].x,this.bgElements[i].y,150-i,"#fff")
            this.game.draw.Rect(0,0,10000,10000,"rgba(167,199,216,.02)")
            this.bgElements[i].x-=this.game.camera.velX/this.bgElements[i].velX
            this.bgElements[i].y-=this.game.camera.velY/this.bgElements[i].velX
            if(this.bgElements[i].x>2800){
                this.bgElements[i].x=-100
                this.bgElements[i].y=Math.random()*1300
            }
            if(this.bgElements[i].x<-100){
                this.bgElements[i].x=2800
                this.bgElements[i].y=Math.random()*1300
            }
            if(this.bgElements[i].y>1600){
                this.bgElements[i].y=-100
                this.bgElements[i].x=Math.random()*2500
            }
            if(this.bgElements[i].y<-100){
                this.bgElements[i].y=1600
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