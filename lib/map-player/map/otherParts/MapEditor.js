const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

export class Edit {
    
    x
    y
    gridX
    gridY
    dispX=0
    dispY=0
    rect
    click=false
    selected = 1
    saved = true
    keyDownLastFrame=false

    constructor(g) {
        this.game = g
        this.camera = g.camera
        this.keyMan = kd
        this.drawUtills = g.draw
        this.canvasShape = canvas.getBoundingClientRect()
        
        document.addEventListener("mousedown", (event) => {
          if(event.buttons == 1){

            this.click=true
            this.saved = false
          }
        }, false);
        document.addEventListener("mouseup", (event) => {
            this.click=false
          
        }, false);
        document.addEventListener("contextmenu", (event) => {
          event.preventDefault()
          this.save()
        }, false);

        onmousemove = (event) => {
          this.rect = canvas.getBoundingClientRect()
          this.x = Math.round(((((event.clientX - this.rect.left)/ this.camera.zoom )  / (this.rect.width ) * this.canvasShape.width ))) 
          this.y = Math.round(((((event.clientY - this.rect.top) / (this.camera.zoom)) / (this.rect.height) * this.canvasShape.height)))
        }
    }

    tick(){
      var selectStore = this.selected
      var keythisframe
      var Fill = false
      if(this.selected==9){
        Fill = true
      }
      if(kd.ZERO.isDown()){
        this.selected=0
        keythisframe=true
      }
      if(kd.ONE.isDown()){
        
          this.selected=1
        
        keythisframe=true
      }
      
      if(kd.TWO.isDown()){
        
          this.selected=2
        
        keythisframe=true
      }
      
      if(kd.THREE.isDown()){
        
          this.selected=3
        
        keythisframe=true
      }
      if(kd.FOUR.isDown()){
        
          this.selected=4
        
        keythisframe=true
      }
      if(kd.FIVE.isDown()){
        
          this.selected=5
        
        keythisframe=true
      }
      if(kd.SIX.isDown()){
        
          this.selected=6
        
        keythisframe=true
      }

      if((selectStore==5||selectStore==6) && keythisframe){
        this.selected=selectStore+(this.selected/10)
      }
      if(kd.NINE.isDown()){
        this.selected=9
        keythisframe=true
      }

      if(this.keyDownLastFrame){
        this.selected=selectStore

      }
      if(keythisframe){
        this.keyDownLastFrame=true
      }else{
        this.keyDownLastFrame=false
      }
      
      if(Fill){
        if(this.selected!=9){
          for(let x =0; x<this.game.map.mapBuffer.length; x++){
            for(let y=0; y<this.game.map.mapBuffer[x].length; y++){
              if(this.game.map.mapBuffer[x][y] == 9){
                this.game.map.mapBuffer[x][y] = this.selected
              }
            }
          }
        }else {
          if(kd.O.isDown()){
            
            for(let x =0; x<this.game.map.mapBuffer.length; x++){
              for(let y=0; y<this.game.map.mapBuffer[x].length; y++){
                console.log("success")
                if((this.game.map.mapBuffer[x][y] == 0 || this.game.map.mapBuffer[x][y] == undefined) &&(this.game.map.mapBuffer[Math.max(x-1,0)][y] == 9 || this.game.map.mapBuffer[x][Math.max(y-1,0)] == 9)){
                  
                  this.game.map.mapBuffer[x][y] = 9
                }
              }
            }
          }
        }
      }



      if(this.click){
        if(!this.game.map.mapBuffer[this.gridX]){
          this.game.map.mapBuffer[this.game.map.mapBuffer.length] = [0]
        } else{

          this.game.map.mapBuffer[this.gridX][this.gridY]=this.selected
        }
      }
      if(!this.saved){
        this.game.debug.add("    WARNING, MAP HAS NOT BEEN SAVED")
      }

      
    }

    draw(){
      this.game.debug.add("Map Editor {")
      this.tick()
      this.gridX=Math.round(((this.x + (this.camera.x))-25)/50)
      this.gridY=Math.round(((this.y + (this.camera.y))-25)/50)
      this.game.debug.add("    map editor selection:"+this.selected)
      var color = "#0000"
      ctx.strokeStyle = "#000"


      if(this.gridX<0 || this.gridY<0){
        
        color = "#f002"
        ctx.strokeStyle = "#a00"
      }

        this.dispX=Math.round((this.gridX*50+(this.dispX*2))/3)
        this.dispY=Math.round((this.gridY*50+(this.dispY*2))/3)
        if(!this.dispX){
          this.dispX=0
          this.dispY=0
        }

        this.game.debug.add("    "+this.gridX+","+this.gridY)
        this.game.debug.add("    "+this.dispX+":"+this.dispY)
        
      
      this.game.draw.Rect(this.dispX, this.dispY, 50, 50, color)
      
      
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()
    
      this.game.debug.add("}")
    }

    save(){
      var SaveBuffer ="["
      for(let x =0; x<this.game.map.mapBuffer.length; x++){
        if(x>0){
          SaveBuffer+=","
        }
        SaveBuffer+="["

        for(let y=0; y<this.game.map.mapBuffer[x].length; y++){
          if(y>0){
          SaveBuffer+=","

          }
          if(!this.game.map.mapBuffer[x][y]){
            SaveBuffer+="0"
          }else{

            SaveBuffer+=this.game.map.mapBuffer[x][y]
          }
        }
        
        SaveBuffer+="]"
      }
      SaveBuffer+="]"
      navigator.clipboard.writeText(SaveBuffer);
      this.saved=true
      
    }

}

