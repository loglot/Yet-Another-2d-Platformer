export class Debug{
    fpsCount
    Buffer=""
    noclip = false

    tick(){
        if(kd.BACKSLASH.isDown()){
            this.noclip=true
            this.add(this.noclip)
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