import { Map as MainGround } from               "../lib/map-player/map/mapCarryers/Map.js"
import { Death as MainLava } from               "../lib/map-player/map/mapCarryers/DeathMap.js"
import { Teleport as MainTeleport } from        "../lib/map-player/map/mapCarryers/Teleport.js"
import { Checkpoint as MainCheckpoint } from    "../lib/map-player/map/mapCarryers/checkpoint.js"
import { Enabler as MainEnabler } from          "../lib/map-player/map/mapCarryers/Enabler.js"

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
        this.ground = new MainGround(this.game);
        this.lava = new MainLava(this.game)
        this.teleport = new MainTeleport(this.game)
        this.checkpoint = new MainCheckpoint(this.game) //-438, -509
        this.enabler = new MainEnabler(this.game)
        // this.sign = new signMaker()


    }
}