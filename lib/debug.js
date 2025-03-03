export class Debug{
    fpsCount
    Buffer=""
    noclip = false
    edit = false
    info=false
    triggers=false
    Map=0
    lastFramePressed=false
    profileTimes=new Map()
    game
    constructor(game){
        this.game=game        
    }

    BeginProfiler(lable=""){
        this.profileTimes.set(lable,Date.now())
    }
    EndProfiler(lable=""){
        alert(lable+" : "+(Date.now()-this.profileTimes.get(lable)) +", Target : "+17)
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
                    if(kd.BACKSPACE.isDown()){
                        this.Map++
                        if(this.Map==this.game.map.Maps.length){
                            this.Map=0
                        }
                        
                        this.game.map.mapBuffer=this.game.map.Maps[this.Map]
                        this.game.map.makeMegaMap(1)

                    }else{
                            this.edit=!this.edit
                        
                    }
                }
                this.lastFramePressed=true
            }else if(kd.I.isDown()){
                if(!this.lastFramePressed){
                    this.info=!this.info
                }
                this.lastFramePressed=true
            }else if(kd.T.isDown()){
                if(!this.lastFramePressed){
                    this.triggers=!this.triggers
                }
                this.lastFramePressed=true
            } else{
                this.lastFramePressed=false
            }
        
        }

        if(this.noclip){
            this.add("Noclip {}")
        }
        if(this.triggers){
            this.add("TriggerView {}")
        }
        if(this.info){
            this.add("Info {")
                this.add("    "+"Yet Another YA2P Engine (YA^2 2Pe)")
                this.add("    "+"Yet Another Particle Engine (YAPe)")
                this.add("    "+Math.round(this.game.player.x)+":"+Math.round(this.game.player.y))
                this.add("    "+this.game.player.friction)
                this.add("    "+this.game.player.frictionInertia)
                this.add("    "+this.game.held.selected)
                this.add("    "+this.Map)
                this.add("    "+this.game.background.TargetColor[0]+","+this.game.background.TargetColor[1]+","+this.game.background.TargetColor[2])
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