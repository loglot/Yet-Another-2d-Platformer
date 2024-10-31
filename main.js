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
        game.camera.velR = -50
    }
    if(kd.LEFT.isDown()){
        game.camera.velR = 50
    }
    if(kd.Q.isDown()){
        game.camera.movementFactor = 10
    }
    if(kd.E.isDown()){
        game.camera.movementFactor = 100
        game.player.velX =0
        game.player.velY =0
    }
    game.camera.tick()
    game.player.tick()

    game.display.tick()
    kd.tick()
    requestAnimationFrame(stick)
}