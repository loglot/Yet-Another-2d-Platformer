export class Dash {
    game
    trajectory = new Object()
    animation = new Array()
    index = 0
    speed = 50
    enabled = true
    cooldown = 0
    constructor(game){
        this.game = game
    }
    async execute(){
        if(this.enabled){
            this.enabled = false
            this.index++
            var id = this.index
            this.game.player.velX = this.game.held.trajectory.x * this.speed
            this.game.player.velY = this.game.held.trajectory.y * this.speed
            this.cooldown = 7
            this.game.player.friction = .99;
            this.game.player.frictionInertia = 50;

            for(let i=0; i < 5; i++) {
                this.animation[i] = new Object()        
            }
            // this.game.audio.dashSound()


            this.animate()
    
        }
    }

    async animate(){
        for(let i=0; i < this.animation.length; i++){
            this.animation[i].x = this.game.player.x
            this.animation[i].y = this.game.player.y
            this.animation[i].alpha = 1.5
            await this.game.sleep(50)
        }

    }

    tick(){
        this.cooldown--
        for(let i=0; i < this.animation.length; i++){
            this.animation[i].alpha -= .1
        }

    }
    reset(){
        if(this.cooldown <= 0 && !this.enabled){
            this.enabled = true
            // this.game.audio.dashReloadSound()
        }
    }
}