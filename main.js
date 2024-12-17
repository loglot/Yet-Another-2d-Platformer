
import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)

var fps=0
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
            game.timer.tick()
            game.camera.tick()
            game.player.tick()
            game.held.tick()
            game.save()
        }
        game.background.tick()
        game.display.tick()
        kd.tick()
        game.debug.tick()
        if(game.state=="menu"||game.menu.alpha>0){
         
            game.menu.tick()
        }
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