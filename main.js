

import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)

var fps=0
var time = 0
requestAnimationFrame(stick)
game.load()
function stick(){
    // // document.getElementById("debug").innerHTML = `A not pressed ${game.player.x}`;
    // if(kd.RIGHT.isDown()){
    //     game.camera.velR = -10
    // }
    // if(kd.LEFT.isDown()){
    //     game.camera.velR = 10
    // }
    // if(kd.Q.isDown()){
    //     game.camera.ImpactCameraShake()
    // }
    time += 1/60
    var seconds=(Math.round(time*100)/100)
    game.debug.add(Math.floor(seconds/60)%60+":"+Math.round(seconds%60)) 
    var axes = []
    axes=game.controller.controllerCheck("axes")
    var buttons = []
    buttons=game.controller.controllerCheck("buttons")
    if(fps<60 || kd.F.isDown()){
        game.controller.tick()
        if(kd.P.isDown()||buttons[9]){
            game.state = "menu"
        }
    
        game.menu.preTick()
        
        if(game.state == "game"){
            game.camera.tick()
            game.player.tick()
            game.held.tick()
            game.save()
        }
        game.background.tick()
        game.display.tick()
        kd.tick()
        game.debug.tick()
        game.menu.tick()
        FPSCalc()
    
            
    
    }
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