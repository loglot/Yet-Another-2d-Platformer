'use strict';

import { Hitbox } from "../../hitbox.js";
import { DrawUtils } from "../../../utills/drawUtils.js"

export class Map {

    // fields
    hitboxes = new Array();
    mapBuffer
    drawU = new DrawUtils()
    game
    constructor(game) {
        this.game=game
        this.#createHitboxes();
    }
    
    #createHitboxes() {
        this.mapBuffer=[[0,0,0,1,2,2,1,0],[1,1,0,1,1,1,1,0,1,1],[0,0,0,1,2,2,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,1,1,1,1,1,0],[0,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,2,2,2,2,1,1,0],[0,0,0,0,0,0,0,2,2,2,2,1,1,0],[0,0,0,0,0,0,0,2,2,2,2,1,1,0],[0,0,0,0,0,0,0,2,2,2,2,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,3,3,3,1,1,0,0,0,0,0,0,0,0],[0,3,3,3,1,1,0,0,0,0,0,0,0,0]]
    }


    draw(cameraX, cameraY, color = "#0f0f0f") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].draw(cameraX, cameraY, color);
        }

    }
    nDraw(player, camera, color = "#0f0f0f") {
        // this.game.debug.add("50")
        for (let x = Math.max(Math.round(player.x/50)-24,0); x < Math.min(Math.round(player.x/50)+24,this.mapBuffer.length); x++) {
        
            for (let y = Math.max(Math.round(player.y/50)-13,0); y < Math.min(Math.round(player.y/50)+13,this.mapBuffer[x].length); y++) {
                if(this.mapBuffer[x][y] == 1){

                    this.drawU.Rect((x*50)-1,(y*50)-1,52,52,"#0f0f0f")
                }
                if(this.mapBuffer[x][y] == 2){

                    this.drawU.Rect((x*50)-1,(y*50)-1,52,52,"#700000")
                }
                if(this.mapBuffer[x][y] == 3){

                    this.drawU.Rect((x*50),(y*50),50,50,"rgba(0, 255, 50, .3)")
                }
                // this.hitboxes[i].nDraw(camera, color);
            }
        }
    }
}
