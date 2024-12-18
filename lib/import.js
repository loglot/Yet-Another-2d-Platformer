// import { KeyManager } from "./utills/KeyManager.js";
import {Camera} from "./map-player/player/camera.js"
import { Display } from "./variousParts/GameDisplayer.js"
import { DrawUtils } from "./utills/drawUtils.js"
import { Player } from "./map-player/player/player.js"
import { Debug } from "./debug.js"
import { Map as MapMan } from "../lib/map-player/map/mapCarryers/Map.js"
import { Edit } from "./map-player/map/otherParts/MapEditor.js"
import { Held } from "./map-player/player/heldItems/holdManager.js"
import { Keys } from "./map-player/map/otherParts/Keys.js"
import { Menu } from "./variousParts/menu.js"
import { Background } from "./map-player/map/mapCarryers/Background.js"
import { Controller } from "./utills/ControllerManager.js"
import { Timer } from "./utills/Timer.js"
import { Cookie} from "./utills/CookieManager.js"
export class Imports { 
    
    // keyMan = new KeyManager(this)
    draw = new DrawUtils(this)
    camera = new Camera(this)
    display = new Display(this)
    player = new Player(this)
    debug = new Debug(this)
    map  =  new MapMan(this)
    edit = new Edit(this)
    held = new Held(this)
    keys = new Keys(this)
    menu = new Menu(this)
    background = new Background(this)
    controller = new Controller(this)
    timer = new Timer(this)
    Cookies = new Cookie()

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    save(){
        this.Cookies.set('Position', [this.player.x,this.player.y]) // array
        this.Cookies.set('Checkpoint', this.player.Respawn) // array
        this.Cookies.set('Items', JSON.stringify(Object.fromEntries(this.player.Held))) // map
        this.Cookies.set('BGColor', this.background.TargetColor) // array
        this.Cookies.set('Map', this.debug.Map) // number
        this.Cookies.set('Time', this.timer.time) // number

    }
    load(){
        if(this.Cookies.get('Position')){

            var position = JSON.parse("["+this.Cookies.get('Position')+"]") // array
            this.player.x=position[0]
            this.player.y=position[1]
            this.camera.x=position[0]-1250
            this.camera.y=position[1]-1000
            
            var Checkpoint = JSON.parse("["+this.Cookies.get('Checkpoint')+"]") // array
            this.player.Respawn=Checkpoint
    
            var Items = new Map(Object.entries(JSON.parse(this.Cookies.get('Items')))) // map
            this.player.Held = Items
    
            var BGColor = JSON.parse("["+this.Cookies.get('BGColor')+"]") // array
            this.background.TargetColor = BGColor
    
            var Mape = this.Cookies.get('Map')
            this.debug.Map= Mape
            this.map.mapBuffer=this.map.Maps[this.debug.Map]
    
            var Time = this.Cookies.get('Time')
            this.timer.time=Time*1
    
        }

    }

    state = "menu"
}