import { Dash } from "./dash.js"
import { Hook } from "./hookI.js"
import { HookII as Pickaxe } from "./hookII.js"
import { Bazooka } from "./Bazooka.js"
import { Shotgun } from "./Shotgun.js"
import { Portals } from "./portalMaker.js"

const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");


export class Held {
    trajectory = {x:1,y:1}
    game
    heldItems = []
    selected = 0
    image = new Image()
    imageX = 0
    imageY = 0
    imageA = 0
    mousePos
    dash
    pickaxe
    hook
    bazooka
    shotgun
    portal
    camX=0
    camY=0
    canvasShape = this.canvasShapeSet()
    constructor(game){
        this.game = game
        this.dash=new Dash(this.game)
        this.pickaxe=new Pickaxe(this.game)
        this.hook=new Hook(this.game)
        this.bazooka=new Bazooka(this.game)
        this.shotgun=new Shotgun(this.game)
        this.portal=new Portals(this.game)

        document.addEventListener("mousedown", (event) => {
            if (event.button == 0) {
              this.execute()

                const diffX = (this.mousePos.x-this.canvasShape.width - this.game.camera.x) + (this.game.player.x);
                const diffY = (this.mousePos.y-this.canvasShape.height - this.game.camera.y) + (this.game.player.y); 
                const mouseDistance = (diffX ** 2 + diffY ** 2) ** 0.5;

                this.trajectory.x = diffX / mouseDistance;
                this.trajectory.y = diffY / mouseDistance;
            }
          }, false);
    
          document.addEventListener('contextmenu', event => {
            event.preventDefault();
          }, false);    
    
          document.addEventListener("mouseup", (event) => {
            if (event.button == 0) {
              this.unExecute()
            }
    
          })
          
          document.addEventListener("mousemove", (event) => {
            var rect = canvas.getBoundingClientRect()
            this.mousePos = this.getMousePos(canvas, event);
            this.mousePos.x = ((((this.mousePos.x) / (rect.width)) * this.canvasShape.width) - this.camX)
            this.mousePos.y = (((this.mousePos.y) / (rect.height)) * this.canvasShape.height) - this.camY
            this.mousePos.cx = this.camX
            this.mousePos.cy = this.camY
          })
    }


    canvasShapeSet(){
        return{
            width:2514,
            height:1377
        }
      }
    tick(){
        this.hook.tick()
        this.game.debug.add(this.selected)
        this.game.debug.add(this.trajectory.x+":"+this.trajectory.y)
      
    }
    getMousePos(canvas, evt) {
     var rect = canvas.getBoundingClientRect();
     return {
         x: evt.clientX - rect.left,
         y: evt.clientY - rect.top
     };
   }

    grounded(){
        this.game.dash.reset()
    }

    up(){
        this.check()
        this.selected++
        var i=0
        while(!this.heldItems[this.selected] && i < 30){
            this.selected++
            i++
            if(this.selected > 5){
                this.selected = 0
            }
        }
        if(!this.heldItems[this.selected]){
            this.cancel()
        } else {this.makeImg()}
    }

    down(){
        this.check()
        this.selected--
        var i=0
        while(!this.heldItems[this.selected] && i < 30){
            this.selected--
            i++
            if(this.selected < 0){
                this.selected = 5
            }
        }
        if(!this.heldItems[this.selected]){
            this.cancel()
        } else {this.makeImg()}
    }

    cancel(){
        this.selected = -1
    }

    makeImg(){
        // switch(this.selected) {
        //     case 0: 
        //     this.image = this.game.keys.Enabled.get("hook");
        //     break;
        //     case 1: 
        //     this.image = this.game.keys.Enabled.get("pickaxe");
        //     break;
        //     case 2: 
        //     this.image = this.game.keys.Enabled.get("bazooka");
        //     break;
        //     case 3: 
        //     this.image = this.game.keys.Enabled.get("shotgun");
        //     break;
        //     case 4: 
        //     this.image = this.game.keys.Enabled.get("dash");
        //     break;
        //     case 5: 
        //     this.image = this.game.keys.Enabled.get("portal");
        //     break;
        // }
        // this.imageA = 5
        // this.game.audio.cycleSound(.3)
    }

    check(){
        this.heldItems[0] = false
        this.heldItems[1] = false
        this.heldItems[2] = false
        this.heldItems[3] = false
        this.heldItems[4] = false
        this.heldItems[5] = false
        this.heldItems[0] = true
        
        if(this.game.player.Held.get("hook")){
            this.heldItems[0] = true
        }
        if(this.game.player.Held.get("pickaxe")){
            this.heldItems[1] = true
        }
        if(this.game.player.Held.get("bazooka")){
            this.heldItems[2] = true
        }
        if(this.game.player.Held.get("shotgun")){
            this.heldItems[3] = true
        }
        if(this.game.player.Held.get("dash")){
            this.heldItems[4] = true
        }
        if(this.game.player.Held.get("portal")){
            this.heldItems[5] = true
        }
        
    }

    execute(){
        switch(this.selected) {
            case 0:
                this.hookF()
                break
            // case 1:
            //     this.pickaxe()
            //     break
            // case 2:
            //     this.bazooka()
            //     break
            // case 3:
            //     this.shotgun()
            //     break
            // case 4:
            //     this.dash()
            //     break
            // case 5:
            //     this.portal()
            //     break
            // case 6:
            //     break
        }
    }

    unExecute(){
        this.hookUp()
        this.pickaxeUp()
    }

    dashF(){
        this.game.dash.execute()
    }

    shotgunF(){
        this.game.shotgun.execute()
    }

    hookF(){
            this.hook.execute()
    }

    pickaxeF(){
        this.game.hookII.visibility = true
        this.game.hookII.enabled = false
        this.game.hookII.motion = true
        this.game.hookII.setup()
        if (this.game.hookII.visibility) {
        //   this.game.audio.hookSound()
        } else {
        //   this.game.audio.breakSound()
        }
    }
    
    bazookaF(){
        this.game.bazooka.summon()
    }

    portalF(){
        this.game.portals.summon()
    }

    hookUp(){
        if(this.hook.enabled){
            this.hook.unexecute()
        }
    }

    pickaxeUp(){
        // if(this.game.hookII.visibility){
        //     this.game.hookII.visibility = false
        //     this.game.hookII.enabled = false
        //     this.game.hookII.motion = true
        //     if (this.game.hookII.visibility) {
        //     //   this.game.audio.hookSound()
        //     } else {
        //     //   this.game.audio.breakSound()
        //     }
        //   }
    }


}