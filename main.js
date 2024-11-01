

import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)

var fps=0
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
    FPSCalc()
    requestAnimationFrame(stick)
}


async function FPSCalc(){
    fps++
    await sleep(1000)
    fps--
    game.debug.fpsCount = fps
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}