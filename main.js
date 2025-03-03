
import { Imports } from "./lib/import.js";
// import kd, { tick } from "./lib/utills/KeyManager.js";

var game = new Imports(this)

var fps=0
var autoSave = 100
game.menu.preTick()
requestAnimationFrame(stick)
game.load()
function stick(){
    requestAnimationFrame(stick)
    game.debug.BeginProfiler("fullTick")
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
    
        
        if(game.state == "game"){
            game.timer.tick()
            game.camera.tick()
            game.player.tick() // OPTIMIZE?
            game.held.tick()
            autoSave--
            if(autoSave<=0){
                game.save() // OPTIMIZED BY ONLY HAPPENING EVERY 400 TICKS
                autoSave=400
                // alert("AUTOSAVE!")
            }
        }
        game.background.tick() // OPTIMIZE?
        game.display.tick() // OPTIMIZED BY USING CASHED MAP INSTEAD OF DRAWING AROUND THE PLAYER EVERY TICK
        kd.tick()
        game.debug.tick()
        if(game.state=="menu"||game.menu.alpha>0){
         
            game.menu.tick()
        }
        FPSCalc()
    
            
        // game.debug.EndProfiler()
            if(kd.J.isDown()){
                game.debug.EndProfiler("fullTick")
            }
    
    }
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