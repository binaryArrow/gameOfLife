import {Cell} from "./cell";

export class Game {
    rows: number
    columns: number
    grid: HTMLCanvasElement
    context: CanvasRenderingContext2D
    cells: Cell[] = []

    constructor(canvas: HTMLCanvasElement) {
        this.grid = canvas
        this.context = canvas.getContext("2d")!
        this.rows = this.grid.height / 10
        this.columns = this.grid.width / 10
        this.createCells()
        window.requestAnimationFrame(() => this.gameLoop())
    }

    gameLoop() {

        this.checkCells()

        this.context.clearRect(0, 0, this.grid.width, this.grid.height)

        this.cells.forEach((it) => {
            it.draw()
        })

        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameLoop())
        }, 100)
    }

    createCells() {
        for (let posY = 0; posY < this.rows; posY++) {
            for (let posX = 0; posX < this.columns; posX++) {
                this.cells.push(new Cell(this.context, posX, posY))
            }
        }
    }

    checkCells() {
        for (let posY = 0; posY < this.rows; posY++) {
            for (let posX = 0; posX < this.columns; posX++) {
                // check neighbours of every cell and save how many neighbours are alive
                let numberOfNeighboursAlive = this.isAlive(posX + 1, posY)
                    + this.isAlive(posX - 1, posY)
                    + this.isAlive(posX, posY - 1)
                    + this.isAlive(posX, posY + 1)
                    + this.isAlive(posX + 1, posY - 1)
                    + this.isAlive(posX + 1, posY + 1)
                    + this.isAlive(posX - 1, posY - 1)
                    + this.isAlive(posX - 1, posY + 1)
                let index = this.getIndexOfCellFromCoordinates(posX, posY)
                switch (numberOfNeighboursAlive) {
                    case 2:{
                        this.cells[index].aliveInNextGeneration = this.cells[index].alive
                        this.cells[index].cameAlive = false
                        break
                    }
                    case 3: {
                        this.cells[index].aliveInNextGeneration = true
                        this.cells[index].cameAlive = true
                        break
                    }
                    default:{
                        this.cells[index].aliveInNextGeneration = false
                        this.cells[index].cameAlive = false
                        break
                    }
                }
            }
        }
        // take over the values from nextGeneration
        this.cells.forEach((it) => {
            it.alive = it.aliveInNextGeneration
        })
    }

    isAlive(x: number, y: number): number {
        // check grid boundaries, return 0 if cell out of grid
        if (x < 0 || x >= this.columns || y < 0 || y >= this.rows)
            return 0
        // return 1 if neighbours is alive and 0 if not
        return this.cells[this.getIndexOfCellFromCoordinates(x, y)].alive ? 1 : 0
    }

    getIndexOfCellFromCoordinates(x: number, y: number): number {
        return x + (y * this.columns)
    }

}