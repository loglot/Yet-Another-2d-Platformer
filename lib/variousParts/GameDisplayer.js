
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
        this.game.draw.Rect(0,0,10000,10000,"white")

        this.game.camera.transform(ctx)
        this.game.player.drawPlayer()
        this.game.draw.Rect(750,750,100,100)
        this.game.draw.Rect(0,0,100,100)
        
        this.game.camera.undoTransform(ctx)
        
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
