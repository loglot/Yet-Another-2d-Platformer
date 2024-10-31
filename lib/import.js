// import { KeyManager } from "./utills/KeyManager.js";
import {Camera} from "./map-player/player/camera.js"
import { Display } from "./variousParts/GameDisplayer.js"
import { DrawUtils } from "./utills/drawUtils.js"
import { Player } from "./map-player/player/player.js"
import { Debug } from "./debug.js"

export class Imports { 
    // keyMan = new KeyManager(this)
    draw = new DrawUtils(this)
    camera = new Camera(this)
    display = new Display(this)
    player = new Player(this)
    debug = new Debug(this)
}