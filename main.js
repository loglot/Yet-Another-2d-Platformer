document.getElementById("debug").innerHTML = "W not pressed";


import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)


requestAnimationFrame(stick)

function stick(){
    // document.getElementById("debug").innerHTML = "S not pressed";
    // if(kd.S.isDown()){
    //     document.getElementById("debug").innerHTML = "S pressed";
    // }
    kd.tick()
    requestAnimationFrame(stick)
}