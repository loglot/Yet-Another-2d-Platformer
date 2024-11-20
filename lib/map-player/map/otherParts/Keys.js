const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

        //this.hookState(11302 + this.camera.x, -2227 + this.camera.y)
        //this.pickaxeState(4424 + this.camera.x,9345 + this.camera.y)
        //this.hookTip(5743,9072, "right")
        //this.jump(7533,-389)



export class Keys {
    camera;
    door = new Image();
    keyD = new Image();
    keyW = new Image();
    keyQ = new Image();
    keyE = new Image();
    keySpace = new Image();
    keyShift = new Image();
    keyS = new Image();
    keyL = new Image();
    warnLava = new Image();
    warnGrey = new Image();
    redFlag = new Image();
    hookDisabled = new Image();
    hookEnabled = new Image();
    pickaxeDisabled = new Image();
    pickaxeEnabled = new Image();
    bazookaDisabled = new Image();
    bazookaEnabled = new Image();
    shotgunEnabled = new Image();
    shotgunDisabled = new Image();
    dashEnabled = new Image();
    dashDisabled = new Image();
    leftClick = new Image()
    rightClick = new Image()
    Enabled = new Map()
    Disabled = new Map()

    constructor(root){
        this.door.src = 'assets/images/door.png';
        this.keyD.src = 'assets/images/keys/D_Key_Dark.png';
        this.keyW.src = 'assets/images/keys/W_Key_Dark.png';
        this.keyQ.src = 'assets/images/keys/Q_Key_Dark.png';
        this.keyE.src = 'assets/images/keys/E_Key_Dark.png';
        this.keyS.src = 'assets/images/keys/S_Key_Dark.png';
        this.keyL.src = 'assets/images/keys/L_Key_Dark.png'; //
        this.leftClick.src = 'assets/images/keys/Mouse_Left_Key_Dark.png';
        this.rightClick.src = 'assets/images/keys/Mouse_Right_Key_Dark.png';
        this.keySpace.src = 'assets/images/keys/Space_Key_Dark.png';
        this.warnLava.src = 'assets/images/warn.png';
        this.warnGrey.src = 'assets/images/warnGrey.png';
        this.redFlag.src = 'assets/images/redFlag.png';

        this.Disabled.set("hook",new Image());
        this.Disabled.get("hook").src = 'assets/images/hookDisabled.png'
        this.Enabled.set("hook",new Image());
        this.Enabled.get("hook").src = 'assets/images/hookEnabled.png'

        this.Disabled.set("pickaxe",new Image());
        this.Disabled.get("pickaxe").src = 'assets/images/pickaxeDisabled.png'
        this.Enabled.set("pickaxe",new Image());
        this.Enabled.get("pickaxe").src = 'assets/images/pickaxeEnabled.png'

        this.Disabled.set("bazooka",new Image());
        this.Disabled.get("bazooka").src = 'assets/images/bazookaDisabled.png'
        this.Enabled.set("bazooka",new Image());
        this.Enabled.get("bazooka").src = 'assets/images/bazookaEnabled.png'

        this.Disabled.set("shotgun",new Image());
        this.Disabled.get("shotgun").src = 'assets/images/shotgunDisabled.png'
        this.Enabled.set("shotgun",new Image());
        this.Enabled.get("shotgun").src = 'assets/images/shotgunEnabled.png'

        this.Disabled.set("dash",new Image());
        this.Disabled.get("dash").src = 'assets/images/dashDisabled.png'
        this.Enabled.set("dash",new Image());
        this.Enabled.get("dash").src = 'assets/images/dashEnabled.png'

        this.Disabled.set("portal",new Image());
        this.Disabled.get("portal").src = 'assets/images/teleportDisabled.png'
        this.Enabled.set("portal",new Image());
        this.Enabled.get("portal").src = 'assets/images/teleportEnabled.png'

        this.game = root
        this.camera = root.camera

    }
    drawKeys() {
        this.drawImageToGrid(this.keyD,57,43,2,2)
        this.functionToGrid(this.jump,79,40)
        this.functionToGrid(this.jump,92,33)
        this.functionToGrid(this.jump,84,25)

    }

    functionToGrid(func, gridX, gridY, type, item, gridWidth, gridHeight){
        var x = gridX*50
        var y = gridY*50
        if(gridWidth){var width = gridWidth*50}
        if(gridHeight){var height = gridHeight*50}
        if(func==this.jump){
            this.jump(x,y)
        }
        if(func==this.Tip){
            func(x,y,type,item)
        }
        if(func==this.State){
            func(x,y,item)
        }
    }

    
 
    
    jump(x, y) {//79,40
        ctx.drawImage(this.keyW, x, y)
        ctx.drawImage(this.keySpace, x, (y + 50))
    }

    Tip(x, y, type, item){
        if(type == "left") {
            ctx.drawImage(this.leftClick, x, y)
            this.State(x+100 + this.camera.x, y)
        }
        
        if(type == "right") {
            ctx.drawImage(this.leftClick, x +100, y)
            this.State(x, y, item)
        }
    }
    State(x, y, item = "hook") {


        if(this.game.player.Held.get(item)) {
            ctx.drawImage(this.Enabled.get(item), x, y, 100, 100)
        } else {
            ctx.drawImage(this.Disabled.get(item), x, y, 100, 100)
        }
    }



    drawMisc(){
        ctx.globalAlpha= Math.max(Math.min(this.game.held.imageA,1),0)
        ctx.drawImage(this.game.held.image, this.game.player.x-50,this.game.player.y-200, 100, 100)
        ctx.globalAlpha= 1

    }
    drawUIMisc(){

    }

    drawImageToGrid(img, gridX, gridY, gridWidth, gridHeight) {

        let x = gridX*50
        let y = gridY*50
        let width = gridWidth*50
        let height = gridHeight*50
        if(!width){
            ctx.drawImage(img, x, y)
        } else (
            ctx.drawImage(img, x, y, width, height)
        )
    }
    
}


