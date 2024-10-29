document.getElementById("debug").innerHTML = "W not pressed";


import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)


requestAnimationFrame(stick)

function stick(){
    // document.getElementById("debug").innerHTML = `A not pressed ${game.camera.x}`;
    if(kd.A.isDown()){
        game.camera.x--
        // document.getElementById("debug").innerHTML = `A pressed ${game.camera.x}`;
    }
    if(kd.S.isDown()){
        game.camera.y++
    }
    if(kd.D.isDown()){
        game.camera.x++
    }
    if(kd.W.isDown()){
        game.camera.y--
    }

    game.display.tick()
    kd.tick()
    requestAnimationFrame(stick)
}