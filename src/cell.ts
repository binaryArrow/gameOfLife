export class Cell{
    static width = 10
    static height = 10
    context: CanvasRenderingContext2D
    posX: number
    posY: number
    alive: boolean

    constructor(context: CanvasRenderingContext2D, posX: number, posY: number) {
        this.context = context
        this.posX = posX
        this.posY = posY
        this.alive = Math.random() > 0.5
    }

    draw() {
        this.context.fillStyle = this.alive ? '#a8327f':'#32a86f'
        this.context.fillRect(this.posX*Cell.width, this.posY*Cell.height, Cell.width, Cell.height)
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 0.5
        this.context.strokeRect(this.posX*Cell.width, this.posY*Cell.height, Cell.width, Cell.height)
    }
}