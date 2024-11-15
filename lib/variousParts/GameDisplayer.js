
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


    drawHeld(){
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
        }
        this.game.draw.Line(
            this.game.player.x,
            this.game.player.y,
            this.game.player.x+this.game.held.trajectory.x*300,
            this.game.player.y+this.game.held.trajectory.y*300,
            "#000000", 
            1/* + -this.game.held.hook.length/70*/, 
            false, "#6b4101" 
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
