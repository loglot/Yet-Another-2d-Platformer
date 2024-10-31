// import { KeyManager } from "./utills/KeyManager.js";
import {Camera} from "./map-player/player/camera.js"
import { Display } from "./variousParts/GameDisplayer.js"
import { DrawUtils } from "./utills/drawUtils.js"
import { Player } from "./map-player/player/player.js"

export class Imports { 
    debugBuffer=""
    // keyMan = new KeyManager(this)
    draw = new DrawUtils(this)
    camera = new Camera(this)
    display = new Display(this)
    player = new Player(this)

    printDebug(){

        document.getElementById("debug").innerHTML = `${this.debugBuffer}`;
        this.debugBuffer=""
    }
}