let cells;
const params = {
  size: 6
};

params.reset = () => {
};

function datSetup() {
  var gui = new dat.GUI({ name: "Worley Noise Params" });
  gui.add(params, "reset");
  gui.close();
}

class Cell {
  constructor(pos) {
    this.pos = pos
    this.point = createVector(random(this.pos.x, this.pos.x + width / params.size), random(this.pos.y, this.pos.y + height / params.size))
    this.vel = p5.Vector.random2D().normalize().mult(random(width / params.size / 20))
  }


  update_brownian() {
    let range = 5
    let dx = random(-range, range)
    let dy = random(-range, range)
    this.point.add(dx, dy);
  }

  update_bounce() {
    if (this.point.x + this.vel.x > this.pos.x + width / params.size) this.vel.mult(-1, 1)
    if (this.point.y + this.vel.y > this.pos.y + height / params.size) this.vel.mult(1, -1)
    if (this.point.x + this.vel.x < this.pos.x) this.vel.mult(-1, 1)
    if (this.point.y + this.vel.y < this.pos.y) this.vel.mult(1, -1)
    this.point.add(this.vel)
  }

  update() {
    this.update_bounce()
  }
}

function generateCells() {
  cells = [];
  for (let y = 0; y < params.size; y++) {
    let row = []
    for (let x = 0; x < params.size; x++) {
      row.push(new Cell(createVector(x * width / params.size, y * height / params.size)))
    }
    cells.push(row)
  }
}

function drawCells() {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pos = createVector(x, y);
      let cellY = Math.floor(y / (height / params.size))
      let cellX = Math.floor(x / (width / params.size))
      let minDist;
      for (let cY = max(0, cellY - 1); cY <= cellY + 1 && cY < params.size; cY++) {
        for (let cX = max(0, cellX - 1); cX <= cellX + 1 && cX < params.size; cX++) {
          let dist = cells[cY][cX].point.dist(pos);
          if (minDist == undefined || dist < minDist) minDist = dist
        }
      }

      let i = (y * width + x) * 4;
      pixels[i] = map(minDist, 0, width / params.size * 2, 0, 255);
      pixels[i + 1] = map(minDist, 0, width / params.size * 2, 0, 255);
      pixels[i + 2] = map(minDist, 0, width / params.size * 2, 0, 255);
      pixels[i + 3] = 255;
    }
  }
  updatePixels();
}

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  generateCells();

}

function draw() {
  background(255);
  drawCells();
  for (let row of cells) {
    for (let cell of row) {
      cell.update()
    }
  }
}
