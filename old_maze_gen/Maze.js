import { Cell } from "./Cell.js";

class Maze {
    constructor(size, observer) {
        this.size = size;
        this.observer = observer;

        this.maze = Array();
        this.fillCells();
    }

    alertObserver() {
        this.observer(this);
    }

    fillCells() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                this.maze.push(new Cell(x, y));
            }
        }
    }

    getCellIndex(x, y) {
        return y * this.size + x;
    }

    getCell(x, y) {
        return this.maze[this.getCellIndex(x, y)];
    }

    getNeighborsWalls(cell) {
        let neighbors = [];

        if (cell.y - 1 >= 0 && !cell.walls[0])
            neighbors.push(this.getCell(cell.x, cell.y - 1));
        else neighbors.push(undefined);

        if (cell.x + 1 < this.size && !cell.walls[1])
            neighbors.push(this.getCell(cell.x + 1, cell.y));
        else neighbors.push(undefined);

        if (cell.y + 1 < this.size && !cell.walls[2])
            neighbors.push(this.getCell(cell.x, cell.y + 1));
        else neighbors.push(undefined);

        if (cell.x - 1 >= 0 && !cell.walls[3])
            neighbors.push(this.getCell(cell.x - 1, cell.y));
        else neighbors.push(undefined);

        return neighbors;
    }

    getNeighbors(cell) {
        let neighbors = [];

        if (cell.y - 1 >= 0) neighbors.push(this.getCell(cell.x, cell.y - 1));
        else neighbors.push(undefined);

        if (cell.x + 1 < this.size)
            neighbors.push(this.getCell(cell.x + 1, cell.y));
        else neighbors.push(undefined);

        if (cell.y + 1 < this.size)
            neighbors.push(this.getCell(cell.x, cell.y + 1));
        else neighbors.push(undefined);

        if (cell.x - 1 >= 0) neighbors.push(this.getCell(cell.x - 1, cell.y));
        else neighbors.push(undefined);

        return neighbors;
    }

    getNeighbor(neighbors) {
        let valid = [];
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i] !== undefined && !neighbors[i].visited)
                valid.push(i);
        }
        if (valid.length === 0) return -1;
        return valid[Math.floor(Math.random() * valid.length)];
    }

    pause(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async generate(delay = 0) {
        await this.generate_maze(this.maze[0], delay);
        if (delay) await this.pause(delay);
        this.alertObserver();
    }

    async generate_maze(current_cell, delay) {
        current_cell.visited = true;
        let neighbors = this.getNeighbors(current_cell);
        let neighbor = this.getNeighbor(neighbors);
        while (neighbor !== -1) {
            current_cell.walls[neighbor] = false;
            neighbors[neighbor].walls[Cell.getOtherWall(neighbor)] = false;

            if (delay) await this.pause(delay);
            this.alertObserver();

            await this.generate_maze(neighbors[neighbor], delay);

            neighbor = this.getNeighbor(neighbors);
        }
    }
}

export { Maze };
