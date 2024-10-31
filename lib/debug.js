export class Debug{
    fpsCount
    Buffer=""

    print(){
        this.aditionalDebugInfo()
        document.getElementById("debug").innerHTML = `${this.Buffer}`;
        this.Buffer=""
    }
    add(text){
        this.Buffer=this.Buffer+""+text+"\n"
        console.log(this.Buffer, text)
    }
    aditionalDebugInfo(){
        this.add(this.fpsCount)
    }
}