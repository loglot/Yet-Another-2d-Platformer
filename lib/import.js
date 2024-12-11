// import { KeyManager } from "./utills/KeyManager.js";
import {Camera} from "./map-player/player/camera.js"
import { Display } from "./variousParts/GameDisplayer.js"
import { DrawUtils } from "./utills/drawUtils.js"
import { Player } from "./map-player/player/player.js"
import { Debug } from "./debug.js"
import { Map } from "../lib/map-player/map/mapCarryers/Map.js"
import { Edit } from "./map-player/map/otherParts/MapEditor.js"
import { Held } from "./map-player/player/heldItems/holdManager.js"
import { Keys } from "./map-player/map/otherParts/Keys.js"
import { Menu } from "./variousParts/menu.js"
import { Background } from "./map-player/map/mapCarryers/Background.js"
import { Controller } from "./utills/ControllerManager.js"

export class Imports { 
    // keyMan = new KeyManager(this)
    draw = new DrawUtils(this)
    camera = new Camera(this)
    display = new Display(this)
    player = new Player(this)
    debug = new Debug(this)
    map  =  new Map(this)
    edit = new Edit(this)
    held = new Held(this)
    keys = new Keys(this)
    menu = new Menu(this)
    background = new Background(this)
    controller = new Controller(this)

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    save(){
        Cookies.set('Position', [this.player.x,this.player.y])

    }
    load(){
        // player stuff
        var position = JSON.parse("["+Cookies.get('Position')+"]") 
        this.player.x=position[0]
        this.player.y=position[1]
        this.camera.x=position[0]-1250
        this.camera.y=position[1]-1000
        console.log(position)
    }

    state = "menu"
}