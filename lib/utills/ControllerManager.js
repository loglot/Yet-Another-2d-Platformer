export class Controller{
    gamepad
    connected = false
    constructor(){
        this.gamepad = [];
    }
    tick(){
        if (navigator.getGamepads) this.gamepad = navigator.getGamepads();
        else if (navigator.webkitGetGamepads) this.gamepad = navigator.webkitGetGamepads();
        if(this.gamepad[0]!=null){
            this.connected = true            
        } else { 
            this.connected = false
        }
        
    }
}