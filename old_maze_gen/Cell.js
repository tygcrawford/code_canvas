class Cell {
  constructor(x, y) {
    this.visited = false;
    this.walls = [true, true, true, true];
    this.x = x;
    this.y = y;
  }

  static getOtherWall(wall) {
    switch (wall) {
      case 0:
        return 2;
      case 1:
        return 3;
      case 2:
        return 0;
      case 3:
        return 1;
    }
  }
}

export { Cell };
