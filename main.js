document.getElementById("debug").innerHTML = "W not pressed";


import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)


requestAnimationFrame(stick)

function stick(){
    // document.getElementById("debug").innerHTML = `A not pressed ${game.player.x}`;
    if(kd.A.isDown()){
        game.player.velX--
        // document.getElementById("debug").innerHTML = `A pressed ${game.player.x}`;
    }
    if(kd.S.isDown()){
        game.player.velY++
    }
    if(kd.D.isDown()){
        game.player.velX++
    }
    if(kd.W.isDown()){
        game.player.velY--
    }
    if(kd.RIGHT.isDown()){
        game.camera.velR--
    }
    if(kd.LEFT.isDown()){
        game.camera.velR++
    }
    game.camera.tick()
    game.player.tick()

    game.display.tick()
    kd.tick()
    requestAnimationFrame(stick)
}