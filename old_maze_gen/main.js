import { Pane } from "./Pane.js";
import { Maze } from "./Maze.js";
import { Rat } from "./Rat.js";

async function main() {
    const cnv = document.getElementById("cnv");
    const ctx = cnv.getContext("2d");

    const size = 40;
    const delay = 1;

    const pane = new Pane(cnv, ctx, size);
    const maze = new Maze(size, pane.drawMaze.bind(pane));

    await maze.generate(delay);

    const rat = new Rat(maze);
    let solution = rat.solve(0, 0, size - 1, size - 1);
    pane.drawPath(solution, maze);
}

window.onload = () => {
    main();
};
