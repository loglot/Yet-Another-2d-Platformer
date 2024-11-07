export class Debug{
    fpsCount
    Buffer=""
    noclip = false
    edit = false
    info=false
    lastFramePressed=false
    game
    constructor(game){
        this.game=game        
    }

    tick(){
        if(kd.BACKSLASH.isDown()){
            if(kd.N.isDown()){
                if(!this.lastFramePressed){
                    this.noclip=!this.noclip
                }
                this.lastFramePressed=true
            }else if(kd.M.isDown()){
                if(!this.lastFramePressed){
                    this.edit=!this.edit
                }
                this.lastFramePressed=true
            }else if(kd.I.isDown()){
                if(!this.lastFramePressed){
                    this.info=!this.info
                }
                this.lastFramePressed=true
            } else{
                this.lastFramePressed=false
            }
        
        }

        if(this.info){
            this.add("Info {")
                this.add("    "+Math.round(this.game.player.x)+":"+Math.round(this.game.player.y))
            this.add("}")
        }
        this.print()
    }

    print(){
        this.aditionalDebugInfo()
        document.getElementById("debug").innerHTML = `${this.Buffer}`;
        this.Buffer=""
    }
    add(text){
        this.Buffer=this.Buffer+""+text+"\n"
    }
    aditionalDebugInfo(){
        this.add(this.fpsCount)
    }
}