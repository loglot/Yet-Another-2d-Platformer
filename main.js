document.getElementById("debug").innerHTML = "W not pressed";


import { Imports } from "./lib/import.js";
import kd, { tick } from "./lib/utills/KeyManager.js";

game = new Imports(this)

kd.run()

requestAnimationFrame(stick)

function stick(){
    document.getElementById("debug").innerHTML = "W not pressed";
    if(kd.W.isDown()){
        document.getElementById("debug").innerHTML = "W pressed";
    }
}