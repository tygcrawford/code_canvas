let player;
let walls;
const params = {
  walls: 0,
  boxes: 15,
  box_size: 5,
  fov: 60,
  rays: 400,
  cast_from: "correct",
  screen_dist: 5,
  borders: true,
  distance_correction: true
};

params.reset = () => {
  walls = [];
  generateWalls();
  generateBorders();
  generateBoxes()
  player = new Player();
};

function datSetup() {
  var gui = new dat.GUI({ name: "Raycasting Params", width: 300 });
  gui.add(params, "fov", 0, 170);
  gui.add(params, "rays", 0, 400, 1);
  gui.add(params, "screen_dist", 0, 100);
  gui.add(params, "cast_from", ["correct", "mixed", "screen", "player"])
  gui.add(params, "walls", 0, 20, 1).onChange(params.reset);
  gui.add(params, "boxes", 0, 40, 1).onChange(params.reset);
  gui.add(params, "box_size", 0, 200).onChange(params.reset);
  gui.add(params, "borders").onChange(params.reset);
  gui.add(params, "distance_correction");
  gui.add(params, "reset");
  gui.close();
}

function generateWalls() {
  for (let i = 0; i < params.walls; i++) {
    walls.push(new Wall());
  }
}

function generateBorders() {
  if (!params.borders) return;
  let p1, p2;
  p1 = createVector(0, 0);
  p2 = createVector(width / 2, 0);
  walls.push(new Wall(p1, p2));
  p1 = createVector(0, 0);
  p2 = createVector(0, height);
  walls.push(new Wall(p1, p2));
  p1 = createVector(0, height);
  p2 = createVector(width / 2, height);
  walls.push(new Wall(p1, p2));
  p1 = createVector(width / 2, 0);
  p2 = createVector(width / 2, height);
  walls.push(new Wall(p1, p2));
}

function generateBoxes() {
  for (let i = 0; i < params.boxes; i++) {
    let x = random(0, width * 0.5 - params.box_size)
    let y = random(0, height - params.box_size)
    let p1, p2;
    p1 = createVector(x, y)
    p2 = createVector(x + params.box_size, y)
    walls.push(new Wall(p1, p2));
    p1 = createVector(x, y)
    p2 = createVector(x, y + params.box_size)
    walls.push(new Wall(p1, p2));
    p1 = createVector(x, y + params.box_size)
    p2 = createVector(x + params.box_size, y + params.box_size)
    walls.push(new Wall(p1, p2));
    p1 = createVector(x + params.box_size, y)
    p2 = createVector(x + params.box_size, y + params.box_size)
    walls.push(new Wall(p1, p2));
  }
}

function drawWalls() {
  for (let wall of walls) {
    wall.draw();
  }
}

function draw3d(rays) {
  noStroke();
  let width_start = width / 2;
  let bar_width = width / 2 / rays.length;
  for (let i = 0; i < rays.length; i++) {
    let ray = rays[i]
    if (ray.cast != null) {
      let ray_len = ray.pos.dist(ray.cast);
      if (params.distance_correction) ray_len *= cos(ray.dir.heading() - player.dir.heading());
      let max_len = sqrt(4 * pow(height, 2) + pow(width, 2)) / 2;
      //let bar_height = map(ray_len, 0, max_len, height * 1, height * 0.05);
      let bar_height = 30000 / ray_len;
      let color_factor = map(ray_len, 0, max_len, 1, 0.4);

      if (!ray.horizontalIntersect() && !ray.verticalIntersect()) {
        fill(color_factor * 255 * 0.8, 0, 0);
      }
      else if (ray.horizontalIntersect()) fill(color_factor * 255, 0, 0)
      else if (ray.verticalIntersect()) fill(color_factor * 255 * 0.6, 0, 0)
      rect(
        width_start + bar_width * i,
        height / 2 - bar_height * 0.35,
        bar_width + 1,
        bar_height,
      )
    }
  }
}

function setup() {
  createCanvas(800, 400);

  walls = [];
  generateBorders();
  generateWalls();
  generateBoxes();

  player = new Player();

  datSetup();
}

function draw() {
  background(0);
  drawWalls();
  player.update();
  player.draw();

  let rayGenerator;
  switch (params.cast_from) {
    case "player":
      rayGenerator = player.genRaysPlayer.bind(player);
      break;
    case "screen":
      rayGenerator = player.genRaysScreenStraight.bind(player);
      break;
    case "mixed":
      rayGenerator = player.genRaysScreenShifted.bind(player);
      break;
    case "correct":
      rayGenerator = player.genRaysCorrect.bind(player);
      break;
    default:
      rayGenerator = player.genRaysPlayer.bind(player);
  }
  let rays = player.raycast(rayGenerator);

  for (let ray of rays) {
    ray.draw()
  }
  draw3d(rays);
}
