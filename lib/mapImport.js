import { Map as MainGround } from               "../system/map-player/map/mapCarryers/Map.js"
import { Death as MainLava } from               "../system/map-player/map/mapCarryers/DeathMap.js"
import { Teleport as MainTeleport } from        "../system/map-player/map/mapCarryers/Teleport.js"
import { Checkpoint as MainCheckpoint } from    "../system/map-player/map/mapCarryers/checkpoint.js"
import { Enabler as MainEnabler } from          "../system/map-player/map/mapCarryers/Enabler.js"

export class Map{
    ground
    lava
    teleport
    game
    checkpoint
    Enabler
    sign
    door

    constructor(root){
        this.Main()
        this.game = root
    }

    Main() {
        this.ground = new MainGround();
        this.lava = new MainLava()
        this.teleport = new MainTeleport()
        this.checkpoint = new MainCheckpoint() //-438, -509
        this.enabler = new MainEnabler()
        this.sign = new signMaker()


    }
}