
const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

import { Item } from "./Item.js";
export class Menu{
    game
    Catagory = []
    constructor(game){
        this.game = game

        this.Catagory[0]=new Item("Saving", undefined, function fun(){

            this.settings[0]= new Item("autoSave?", true, function fun(){
                this.state=!this.state
            },this.game)

        },this.game)
        this.Catagory[1]=new Item("Testing", undefined, function fun(){console.log("test")},this.game)
        this.Catagory[this.Catagory.length]=new Item("Testing", undefined, function fun(){console.log("test")},this.game)
        this.Catagory[this.Catagory.length]=new Item("Testing", undefined, function fun(){console.log("test")},this.game)
        this.Catagory[this.Catagory.length]=new Item("Testing", undefined, function fun(){console.log("test")},this.game)
        this.Catagory[this.Catagory.length]=new Item("Testing", undefined, function fun(){console.log("test")},this.game)

    }

    width = [700,500,0]
    alpha = 1
    rotation = 3
    alphaTarget = 1
    CatagoryY = 0
    settingSelect=0
    lastTick=false
    preTick(){
        this.game.map.makeMegaMap(1)
    }
    tick(){
        var axes = []
        axes=this.game.controller.controllerCheck("axes")
        var buttons = []
        buttons=this.game.controller.controllerCheck("buttons")
        this.draw()
        if(this.game.state=="game"){
            this.width[0]=this.width[0]*.9
            this.width[1]=this.width[1]*.9
            this.rotation=this.rotation*.95
            this.alpha=this.alpha*.95
        }
        if(this.game.state=="menu"){
            this.width[0]=(this.width[0]*4+700)/5
            this.width[1]=(this.width[1]*4+500)/5
            this.rotation=(this.rotation*6+.6)/7
            this.alpha=(this.alpha*6+this.alphaTarget)/7
            if(kd.W.isDown()||buttons[0]){
                this.game.state="game"
            }
            if(kd.S.isDown()||buttons[3]){
                this.game.state="Settings"
                this.lastTick=true  
            }
            if(kd.R.isDown()){
                this.width = [700,0,0]
                this.alpha = 3
            }
        }
        if(this.game.state=="Settings"){
            this.width[0]=(this.width[0]*4+500)/5
            this.width[1]=(this.width[1]*4+1500)/5
            this.rotation=((this.rotation*6+1)/7)-this.settingSelect/(this.Catagory.length*10)
            this.alpha=(this.alpha*6+this.alphaTarget+.3)/7
            if(kd.BACKSPACE.isDown()||buttons[1]){
                this.game.state="menu"
            }
            this.settingsLogic()

        }
    }
    draw(){
        ctx.globalAlpha=this.alpha
        ctx.rect(0, 0, 5000,5000);
        ctx.fillStyle = "#111"
        ctx.fill();
        ctx.globalAlpha=1
        
        this.mainMenu()

        this.settings()


    }
    mainMenu(){

        ctx.beginPath();
        ctx.save()
        ctx.rotate(-Math.min(this.rotation/2,this.rotation/4+.2))
        ctx.rect(-1000, 0, 5000,this.width[0]);
        ctx.clip()
        ctx.rect(-1000, 0, 5000,9000);
        ctx.fillStyle = "#1f1f1f"
        ctx.fill();
        ctx.rotate(Math.min(this.rotation/1.5,this.rotation/2.5+.2))
        this.game.draw.Text("Yet Another 2d Platformer",200,150)
        this.game.draw.Text("Press W To Play",200,350)
        this.game.draw.Text("Press S To Edit Settings",200,250)
        ctx.restore()
        ctx.closePath()
    }
    settings(){

        ctx.beginPath();
        ctx.rotate((this.rotation/10)-2)
        ctx.rect(-2000, -700, 5000,this.width[1]);
        ctx.clip()
        ctx.rect(-1000, 0, 5000,9000);
        ctx.fillStyle = "#2f2f2f"
        ctx.fill();
        ctx.rotate(((this.rotation/10)-30.1)+.5)
        
        ctx.save();
        this.game.draw.Text("=>", 50, 750, "black", "white", ctx, 120)
        this.CatagoryY = (this.CatagoryY*9 +(-100 * (this.settingSelect)))/10
        for(let i = 0; i < this.Catagory.length; i++){

            var ything =450+ (100*i) + (this.CatagoryY)
            this.game.draw.Text(this.Catagory[i].title,((310-i*200)-(this.CatagoryY*2 ))+0,(ything + (((ything)-450)*((ything)-450))/40)+280 ,"black","white",ctx,80 + i*20 +(this.CatagoryY/5 )-4)
            //((310-i*200)-(this.CatagoryY*2 ))+0,(ything + (((ything)-450)*((ything)-450))/40)+280
            //(ything + (((ything)-450)*((ything)-450))/40)+280
        }
        ctx.restore();
        ctx.closePath()
    }

    settingsLogic(){
        var Tick=false
        if(kd.S.isDown()){
            if(!this.lastTick){
                this.settingSelect+=1
            }
            
            this.lastTick=true
            Tick=true
        }
        if(kd.W.isDown()){
            if(!this.lastTick){
                this.settingSelect-=1
            }
            this.lastTick=true
            Tick=true
        }
        this.game.debug.add(this.settingSelect)
        if(!Tick){
            this.lastTick=false

        }
        if(this.settingSelect<0){
            this.settingSelect=0
        }
        if(this.settingSelect>=this.Catagory.length){
            this.settingSelect=this.Catagory.length-1
        }
    }
}