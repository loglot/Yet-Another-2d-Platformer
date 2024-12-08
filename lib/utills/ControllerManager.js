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

    
    controllerCheck(type="axes", num=0){
        if(this.connected){
            if(type=="axes"){
                var axesArray = []
                for(let i = 0; i < 4; i++){
                    axesArray[i] = this.gamepad[0].axes[i]
                }
                return(axesArray)

            }
            if(type=="buttons"){
                var buttonArray = []
                for(let i = 0; i <= 15; i++){
                    buttonArray[i]=this.gamepad[0].buttons[i].pressed
                }
                return(buttonArray)
            }
        } else {
            if(type=="axes"){
                return([0,0,0,0])
            }
            if(type=="buttons"){
                var buttonArray = []
                for(let i = 0; i <= 15; i++){
                    buttonArray[i]=false
                    
                }
                return(buttonArray)
            }

        }
    }

    example(){
        //an example on how to utilize controllerCheck()
        var axes = []
        axes=this.game.controller.controllerCheck("axes")
        var buttons = []
        buttons=this.game.controller.controllerCheck("buttons")
    }
}