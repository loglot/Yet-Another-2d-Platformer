export class Timer {

    time = 0
    game
    constructor(game){
        this.game=game
    }
    tick(){

        this.time += 1/60
        var seconds=(Math.floor(this.time*100)/100)
        this.game.debug.add(("0"+Math.floor(seconds/3600)%24).slice(-2)+":"+("0"+Math.floor(seconds/60)%60).slice(-2)+":"+("0"+Math.floor(seconds%60)).slice(-2)+"."+Math.floor(seconds%1*100)) 

        if(kd.K.isDown()){
            this.time=0
        }
    }
}