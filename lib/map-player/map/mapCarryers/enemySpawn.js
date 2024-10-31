import { Enemy } from "../../../enemy/Enemy.js";

export class Spawn{
    value = new Array()
    constructor(thus, execute = true){
        if (execute == true) {
            this.value[0] = new Enemy(-438, -509, thus);
        }
    }
}