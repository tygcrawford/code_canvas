let player;
let walls;
const params = {
  walls: 5,
  fov: 135,
  rays: 60,
};

params.reset = () => {
  generateMap();
};

function datSetup() {
  var gui = new dat.GUI({ name: "Raycasting Params" });
  gui.add(params, "reset");
  gui.close();
}

class Wall {
  constructor() {
    this.p1 = createVector(random(0, width), random(0, height));
    this.p2 = createVector(random(0, width), random(0, height));
  }

  draw() {
    strokeWeight(1);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}

class Ray {
  constructor(pos, dir) {
    this.pos = pos;
    this.dir = dir;
  }

  cast(line) {
    let x1 = line.p1.x;
    let y1 = line.p1.y;
    let x2 = line.p2.x;
    let y2 = line.p2.y;
    let x3 = this.pos.x + this.dir.x;
    let y3 = this.pos.y + this.dir.y;
    let x4 = this.pos.x;
    let y4 = this.pos.y;

    let t =
      ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) /
      ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    let u =
      ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) /
      ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    let intersection = t > 0 && t < 1 && u > 0;

    if (!intersection) return null;

    return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
  }
}

class Player {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.dir = createVector(1, 1).normalize();
  }

  raycast() {
    let rays = [];
    let startDir = p5.Vector.rotate(
      this.dir,
      (-1 * PI * 2 * params.fov) / 360 / 2
    );
    for (let i = 1; i <= params.rays; i++) {
      rays.push(new Ray(this.pos, startDir.copy()));
      startDir.rotate((PI * 2 * params.fov) / 360 / params.rays);
    }
    for (let r of rays) {
      let p;
      for (let wall of walls) {
        let c = r.cast(wall);
        if (p == undefined || p == null) p = c;
        else if (c != null) {
          if (r.pos.dist(c) < r.pos.dist(p)) p = c;
        }
      }
      strokeWeight(1);
      if (p != null && p != undefined) line(r.pos.x, r.pos.y, p.x, p.y);
    }
  }

  draw() {
    stroke(255);
    strokeWeight(10);
    point(this.pos);
    strokeWeight(1);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.dir.x * 10,
      this.pos.y + this.dir.y * 10
    );
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.dir.rotate((-PI / 180) * 2);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.dir.rotate((PI / 180) * 2);
    }

    if (keyIsDown(UP_ARROW)) {
      this.pos.add(this.dir);
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.pos.sub(this.dir);
    }
  }
}

function generateWalls() {
  walls = [];
  for (let i = 0; i < params.walls; i++) {
    walls.push(new Wall());
  }
}

function drawWalls() {
  for (let wall of walls) {
    wall.draw();
  }
}

function setup() {
  createCanvas(600, 600);

  generateWalls();

  player = new Player();

  datSetup();
}

function draw() {
  background(0);
  drawWalls();
  player.update();
  player.draw();
  player.raycast();
}
