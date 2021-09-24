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
        this.createCells()
        window.requestAnimationFrame(() => this.gameloop())
    }

    gameloop() {

        this.checkCells()

        this.context.clearRect(0, 0, this.grid.width, this.grid.height)

        this.cells.forEach((it) => {
            it.draw()
        })

        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameloop())
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
                        break
                    }
                    case 3: {
                        this.cells[index].aliveInNextGeneration = true
                        break
                    }
                    default:{
                        this.cells[index].aliveInNextGeneration = false
                        break
                    }
                }
            }
        }
        // take over the values from nextGeneration
        for(let i = 0; i < this.cells.length; i++) {
            this.cells[i].alive = this.cells[i].aliveInNextGeneration
        }
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