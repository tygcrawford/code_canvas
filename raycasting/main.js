let map;
let player;
const params = {
  width: 10,
  height: 10,
  cell_likelyhood: 0.65,
};

params.reset = () => {
  generateMap();
};

function datSetup() {
  var gui = new dat.GUI({ name: "Raycasting Params" });
  gui.add(params, "reset");
  gui.close();
}

function generateMap() {
  map = [];
  for (let y = 0; y < params.height; y++) {
    map.push([]);
    for (let x = 0; x < params.width; x++) {
      if (x == 0 || y == 0 || x == params.width - 1 || y == params.height - 1) {
        map[y].push(1);
      } else {
        map[y].push(Math.round(Math.random() * params.cell_likelyhood));
      }
    }
  }
  return map;
}

function displayMap() {
  stroke(0);
  for (let y = 0; y < params.height; y++) {
    for (let x = 0; x < params.width; x++) {
      if (map[y][x]) fill(255);
      else fill(0);
      rect(
        (width / params.width) * x,
        (height / params.height) * y,
        width / params.width,
        height / params.height
      );
    }
  }
}

class Player {
  constructor() {
    let x = random(
      width / params.width,
      (width / params.width) * (params.width - 2)
    );
    let y = random(
      height / params.height,
      (height / params.height) * (params.height - 2)
    );
    this.pos = createVector(x, y);
    this.direction = createVector(1, 1).normalize();
  }

  draw() {
    stroke(255);
    strokeWeight(10);
    point(this.pos);
    strokeWeight(1);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.direction.x * 10,
      this.pos.y + this.direction.y * 10
    );
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.direction.rotate((-PI / 180) * 2);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.direction.rotate((PI / 180) * 2);
    }

    if (keyIsDown(UP_ARROW)) {
      this.pos.add(this.direction);
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.pos.sub(this.direction);
    }
  }
}

function setup() {
  createCanvas(600, 600);

  generateMap();
  player = new Player();

  datSetup();
}

function draw() {
  background(220);
  displayMap();
  player.update();
  player.draw();
}
