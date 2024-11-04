const canvas = document.getElementById("game_screen");
const ctx = canvas.getContext("2d");

export class Edit {
    
    x
    y
    gridX
    gridY
    rect
    click=false
    selected = 1
    saved = true

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
      if(kd.ZERO.isDown()){
        this.selected=0
      }
      if(kd.ONE.isDown()){
        this.selected=1
      }
      
      if(kd.TWO.isDown()){
        this.selected=2
      }
      
      if(kd.THREE.isDown()){
        this.selected=3
      }



      if(this.click){
        if(!this.game.map.mapBuffer[this.gridX]){
          this.game.map.mapBuffer[this.game.map.mapBuffer.length] = []
        } else{

          this.game.map.mapBuffer[this.gridX][this.gridY]=this.selected
        }
      }
      if(!this.saved){
        this.game.debug.add("WARNING, MAP HAS NOT BEEN SAVED")
      }

      
    }

    draw(){
      this.tick()
      this.gridX=Math.round(((this.x + (this.camera.x))-25)/50)
      this.gridY=Math.round(((this.y + (this.camera.y))-25)/50)
      this.game.debug.add(this.gridX+","+this.gridY)
      this.game.debug.add("map editor selection:"+this.selected)
      var color = "#0000"
      ctx.strokeStyle = "#000"


      if(this.gridX<0 || this.gridY<0){
        
        color = "#f002"
        ctx.strokeStyle = "#a00"
      }
      this.game.draw.Rect(this.gridX*50, this.gridY*50, 50, 50, color)
      ctx.lineWidth = 5
      ctx.stroke()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    save(){
      var SaveBuffer ="this.mapBuffer=["
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

