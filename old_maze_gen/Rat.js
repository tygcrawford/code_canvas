class Rat {
    constructor(maze) {
        this.maze = maze;
    }

    solve(start_x, start_y, target_x, target_y) {
        let visited = Array(this.maze.maze.length).fill(false);
        let distance = Array(this.maze.maze.length).fill(Infinity);
        let path = Array(this.maze.maze.length).fill(-1);

        distance[this.maze.getCellIndex(start_x, start_y)] = 0;

        let current_cell = this.maze.getCell(start_x, start_y);
        let current_cell_index = this.maze.getCellIndex(
            current_cell.x,
            current_cell.y
        );

        let neighbors;
        while (!visited[this.maze.getCellIndex(target_x, target_y)]) {
            neighbors = this.maze.getNeighborsWalls(current_cell);
            for (let cell_i = 0; cell_i < neighbors.length; cell_i++) {
                let cell = neighbors[cell_i];
                if (cell !== undefined) {
                    let i = this.maze.getCellIndex(cell.x, cell.y);
                    if (distance[current_cell_index] + 1 < distance[i]) {
                        distance[i] = distance[current_cell_index] + 1;
                        path[i] = current_cell_index;
                    }
                }
            }
            visited[current_cell_index] = true;

            // find the index of the lowest unvisited cell???
            let min_i = -1;
            for (let i = 0; i < visited.length; i++) {
                if (min_i === -1 && !visited[i]) min_i = i;
                else if (distance[i] < distance[min_i] && !visited[i])
                    min_i = i;
            }
            current_cell_index = min_i;

            current_cell = this.maze.maze[current_cell_index];
        }

        let solution = [this.maze.getCellIndex(start_x, start_y)];
        current_cell_index = this.maze.getCellIndex(target_x, target_y);
        while (
            current_cell_index !== this.maze.getCellIndex(start_x, start_y)
        ) {
            solution.push(current_cell_index);
            current_cell_index = path[current_cell_index];
        }
        return solution;
    }
}

export { Rat };
