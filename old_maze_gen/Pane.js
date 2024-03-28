CanvasRenderingContext2D.prototype.drawLine = function (x1, y1, x2, y2) {
    this.beginPath();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
    this.stroke();
};

class Pane {
    constructor(cnv, ctx, maze_size) {
        this.cnv = cnv;
        this.ctx = ctx;

        this.width = this.cnv.width;
        this.height = this.cnv.height;

        this.cell_w = this.width / maze_size;
        this.cell_h = this.height / maze_size;
    }

    drawCellWalls(cell) {
        if (cell.walls[0])
            this.ctx.drawLine(
                cell.x * this.cell_w,
                cell.y * this.cell_h,
                cell.x * this.cell_w + this.cell_w,
                cell.y * this.cell_h
            );
        if (cell.walls[1])
            this.ctx.drawLine(
                cell.x * this.cell_w + this.cell_w,
                cell.y * this.cell_h,
                cell.x * this.cell_w + this.cell_w,
                cell.y * this.cell_h + this.cell_h
            );
        if (cell.walls[2])
            this.ctx.drawLine(
                cell.x * this.cell_w,
                cell.y * this.cell_h + this.cell_h,
                cell.x * this.cell_w + this.cell_w,
                cell.y * this.cell_h + this.cell_h
            );
        if (cell.walls[3])
            this.ctx.drawLine(
                cell.x * this.cell_w,
                cell.y * this.cell_h,
                cell.x * this.cell_w,
                cell.y * this.cell_h + this.cell_h
            );
    }

    drawCell(cell) {
        if (cell.visited) this.ctx.fillStyle = "#FFF";
        else this.ctx.fillStyle = "#000";

        this.ctx.fillRect(
            cell.x * this.cell_w,
            cell.y * this.cell_h,
            this.cell_w,
            this.cell_h
        );

        this.drawCellWalls(cell);
    }

    drawMaze(maze) {
        maze.maze.forEach((cell) => this.drawCell(cell));
    }

    // temp draw path over
    drawPath(path, maze) {
        this.ctx.fillStyle = "#F00";
        path.forEach((e) => {
            let cell = maze.maze[e];
            this.ctx.fillRect(
                cell.x * this.cell_w,
                cell.y * this.cell_h,
                this.cell_w,
                this.cell_h
            );
        });
        maze.maze.forEach((cell) => this.drawCellWalls(cell));
    }
}

export { Pane };
