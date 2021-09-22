import {Cell} from "./cell";

export class Game {
    gridWidth = 800
    gridHeight = 450
    rows = this.gridHeight / 10
    columns = this.gridWidth / 10

    grid: HTMLCanvasElement
    context: CanvasRenderingContext2D
    cells: Cell[] = []

    constructor(canvas: HTMLCanvasElement) {
        this.grid = canvas
        this.context = canvas.getContext("2d")!
        this.grid.width = this.gridWidth
        this.grid.height = this.gridHeight
        this.drawGrid()
    }

    drawGrid(){
        for(let posY = 0; posY < this.rows; posY++) {
            for(let posX = 0; posX < this.columns; posX++ ) {
                this.cells.push(new Cell(this.context,posX, posY))
            }
        }
        this.cells.forEach(it=>it.draw())
    }

}