
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

var scaleX = 0;
var scaleY = 0;


export class Display{
    game
    constructor(gane){
        this.game=gane
    }
    tick(){
        this.resizeCanvasForWindowSize(canvas, ctx)
        this.game.draw.Rect(0,0,10000,10000,"rgb(167,199,216)")

        this.game.camera.transform(ctx)
        // this.game.draw.Rect(750,750,100,100,"#0f0f0f")
        // this.game.draw.Rect(0,0,100,100,"#0f0f0f")
        // this.game.map.lava.nDraw()
        this.drawHeld()
        this.game.player.drawPlayer()
        this.game.map.nDraw(this.game.camera)
        if(this.game.debug.edit) {this.game.edit.draw()}
        
        
        this.game.camera.undoTransform(ctx)
        
    }

    drawTheBeanPeople() {

        for(let i = 0; i < this.game.enemy.value.length; i++) {
            this.drawUtils.Bean(
                -this.game.enemy.value[i].x + this.camera.x, 
                -this.game.enemy.value[i].y + this.camera.y, 
                50 + (this.game.enemy.value[i].avgVelY/2), 
                100 - this.game.enemy.value[i].avgVelY, 
                "#cf9f9f")
        }

        if(this.debug.bean && !this.player.hidden) {  
        this.drawHeld()
            if (this.player.avgVelY > 20){
                this.drawUtils.Bean(-this.player.x + this.camera.x, -this.player.y + this.camera.y, 50 + (20/2), 100 - 20, "#afbfaf") 
            } else if (this.player.avgVelY < -20){
                this.drawUtils.Bean(-this.player.x + this.camera.x, -this.player.y + this.camera.y, 50 + (-20/2), 100 + 20, "#afbfaf") 
            } else{
                this.drawUtils.Bean(-this.player.x + this.camera.x, -this.player.y + this.camera.y, 50 + (this.player.avgVelY/2), 100 - this.player.avgVelY, "#afbfaf") 
            }

            for(let i = 0; i < this.game.dash.animation.length; i++){
                ctx.globalAlpha = Math.min(1, Math.max(0, this.game.dash.animation[i].alpha))
                this.drawUtils.Line(-this.game.dash.animation[i].x + this.camera.x, -this.game.dash.animation[i].y + this.camera.y - 50,-this.game.dash.animation[i].x + this.camera.x, -this.game.dash.animation[i].y + this.camera.y+25,"#ffffff",50, true, "#33363f", 10 )
            }



        }
        ctx.globalAlpha = .5
        if(this.game.portals.visibility){
            this.drawUtils.Line(this.game.portals.x + this.camera.x, this.game.portals.y + this.camera.y - 50,this.game.portals.x + this.camera.x, this.game.portals.y + this.camera.y+25,"#ffffff",50, true, "#33363f", 10 )
        }
        ctx.globalAlpha = 1
 
    }

    drawHeld(){
        for(let i = 0; i < this.game.held.dash.animation.length; i++){
            ctx.globalAlpha = Math.min(1, Math.max(0, this.game.held.dash.animation[i].alpha))
            this.game.draw.Line(this.game.held.dash.animation[i].x, this.game.held.dash.animation[i].y - 50,this.game.held.dash.animation[i].x, this.game.held.dash.animation[i].y + 25,"#ffffff",50, true, "#33363f", 10 )
        }
        ctx.globalAlpha = 1
        if (this.game.held.hook.enabled) {
            
            this.game.draw.Line(
                this.game.held.hook.x[0],
                this.game.held.hook.y[0],
                this.game.held.hook.x[1],
                this.game.held.hook.y[1],
                "#A06000", 
                30/* + -this.game.held.hook.length/70*/, 
                true, "#6b4101" 
            )
            this.game.draw.Circle(
                this.game.held.hook.x[0],
                this.game.held.hook.y[0],
                15,
                "#6b4101"
                
            )
        }
        this.game.draw.Line(
            this.game.player.x+this.game.held.trajectory.x*80,
            this.game.player.y+this.game.held.trajectory.y*120,
            this.game.player.x+this.game.held.trajectory.x*130,
            this.game.player.y+this.game.held.trajectory.y*170,
            "#33363", 
            1/* + -this.game.held.hook.length/70*/
        )

        // if (this.game.held.hook.visibility) {
        //     this.game.draw.Line(
        //         this.game.held.hook.x1,
        //         this.game.held.hook.y1,
        //         this.game.held.hook.x2,
        //         this.game.held.hook.y2,/**/
        //         "#A06000", 
        //         30 + -this.game.held.hook.length/70, 
        //         true, "#6b4101" )
        // }

        // if (this.game.hookII.visibility) {
        //     this.drawUtils.Line(
        //         this.game.hookII.x1,
        //         this.game.hookII.y1,
        //         this.game.hookII.x2 + this.camera.x,
        //         this.game.hookII.y2 + this.camera.y,/**/
        //         "#6b4101", 
        //         30 + -this.game.hookII.length/70, 
        //         true, "#A06000" )
        // }

        // if (this.game.bazooka.visibility) {
        //     this.drawUtils.Circle(
        //         this.game.bazooka.x +this.camera.x,
        //         this.game.bazooka.y+this.camera.y,
        //         30,
        //         "rgb(50,50,50)"
        //     )
        //     this.drawUtils.Circle(
        //         this.game.bazooka.x +this.camera.x,
        //         this.game.bazooka.y+this.camera.y,
        //         25,
        //         "rgb(255,155,50)"
        //     )
        // }



    }



    originalWidth = canvas.width;
    originalHeight = canvas.height;
    resizeCanvasForWindowSize(canvas, ctx) {
        var currentWidth = canvas.width;
        var currentHeight = canvas.height;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var desiredWidth = windowWidth;
        var aspectRatio = this.originalWidth / this.originalHeight;
        var desiredHeight = desiredWidth / aspectRatio;
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        scaleX = (desiredWidth / this.originalWidth);
        scaleY = (desiredHeight / this.originalHeight);

        ctx.setTransform(scaleY * this.game.camera.zoom, 0, 0, scaleX * this.game.camera.zoom, 0, 0)

        currentWidth = canvas.width;
        currentHeight = canvas.height;
        if (currentHeight >= windowHeight) {
            desiredHeight = windowHeight;
            aspectRatio = this.originalWidth / this.originalHeight;
            desiredWidth = desiredHeight * aspectRatio;
            canvas.width = desiredWidth;
            this.width = desiredWidth
            this.height = desiredHeight
            canvas.height = desiredHeight;
            scaleX = (desiredWidth / this.originalWidth);
            scaleY = (desiredHeight / this.originalHeight);
            ctx.setTransform(scaleY * this.game.camera.zoom, 0, 0, scaleX * this.game.camera.zoom, 0, 0)        
        }
    }
}
