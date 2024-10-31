

import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)


requestAnimationFrame(stick)

function stick(){
    // document.getElementById("debug").innerHTML = `A not pressed ${game.player.x}`;
    if(kd.RIGHT.isDown()){
        game.camera.velR = -10
    }
    if(kd.LEFT.isDown()){
        game.camera.velR = 10
    }
    if(kd.Q.isDown()){
        game.camera.ImpactCameraShake()
    }
    game.camera.tick()
    game.player.tick()

    game.display.tick()
    kd.tick()
    game.debug.print()
    requestAnimationFrame(stick)
}