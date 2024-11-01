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
        this.mapBuffer=[[0,0,0,1,2,2,1,0],[1,1,0,1,1,1,1,0,1,1],[0,0,0,1,2,2,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,0],[0,0,1,1,1,1,1,0]]
    }


    draw(cameraX, cameraY, color = "#0f0f0f") {
        
        for (let i = 0; i < this.hitboxes.length; i++) {
            this.hitboxes[i].draw(cameraX, cameraY, color);
        }

    }
    nDraw(camera, color = "#0f0f0f") {
        for (let x = 0; x < this.mapBuffer.length; x++) {
        
            for (let y = 0; y < this.mapBuffer[x].length; y++) {
                if(this.mapBuffer[x][y] == 1){

                    this.drawU.Rect((x*100)-1,(y*100)-1,102,102,"#0f0f0f")
                }
                if(this.mapBuffer[x][y] == 2){

                    this.drawU.Rect((x*100)-1,(y*100)-1,102,102,"#700000")
                }
                // this.hitboxes[i].nDraw(camera, color);
            }
        }
    }
}
