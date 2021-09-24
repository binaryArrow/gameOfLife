export class Cell{
    static width = 10
    static height = 10
    context: CanvasRenderingContext2D
    posX: number
    posY: number
    alive: boolean
    cameAlive = false
    aliveInNextGeneration = false

    constructor(context: CanvasRenderingContext2D, posX: number, posY: number) {
        this.context = context
        this.posX = posX
        this.posY = posY
        this.alive = Math.random() > 0.5
    }

    draw() {
        // this is for square cells
      this.context.fillStyle = this.alive ? '#6c1fc9':'#eaeaef'
        if(this.cameAlive){
            this.context.fillStyle = '#9d67e8'
        }
        this.context.fillRect(this.posX*Cell.width, this.posY*Cell.height, Cell.width, Cell.height)
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 0.5
        this.context.strokeRect(this.posX*Cell.width, this.posY*Cell.height, Cell.width, Cell.height)

        // this is for round cells
/*        this.context.beginPath()
        this.context.fillStyle = this.alive ? '#e8be47':'#46464b'
        if(this.cameAlive){
            this.context.fillStyle = '#8f7a16'
        }
        this.context.arc(this.posX*Cell.width+5, this.posY*Cell.height+5, 5, 0, 2 * Math.PI)
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 0.5
        this.context.fill()
        this.context.stroke()*/
    }
}