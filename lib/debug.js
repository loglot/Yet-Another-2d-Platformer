export class Debug{
    
    Buffer=""

    print(){
        document.getElementById("debug").innerHTML = `${this.Buffer}`;
        this.Buffer=""
    }
    add(text){
        this.Buffer=this.Buffer+""+text+"\n"
        console.log(this.Buffer, text)
    }
}