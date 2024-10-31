document.getElementById("debug").innerHTML = "W not pressed";


import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)


requestAnimationFrame(stick)

function stick(){
    // document.getElementById("debug").innerHTML = `A not pressed ${game.camera.x}`;
    if(kd.A.isDown()){
        game.camera.velX--
        // document.getElementById("debug").innerHTML = `A pressed ${game.camera.x}`;
    }
    if(kd.S.isDown()){
        game.camera.velY++
    }
    if(kd.D.isDown()){
        game.camera.velX++
    }
    if(kd.W.isDown()){
        game.camera.velY--
    }
    game.camera.tick()

    game.display.tick()
    kd.tick()
    requestAnimationFrame(stick)
}