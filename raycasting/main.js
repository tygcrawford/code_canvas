let player;
let walls;
const params = {
  walls: 0,
  fov: 60,
  rays: 400,
};

params.reset = () => {};

function datSetup() {
  var gui = new dat.GUI({ name: "Raycasting Params" });
  gui.add(params, "fov", 0, 365);
  gui.add(params, "rays", 0, 400);
  gui.add(params, "reset");
  gui.close();
}

function generateWalls() {
  walls = [];
  for (let i = 0; i < params.walls; i++) {
    walls.push(new Wall());
  }
  let p1, p2;
  p1 = createVector(0,0);
  p2 = createVector(width/2, 0);
  walls.push(new Wall(p1, p2));
  p1 = createVector(0,0);
  p2 = createVector(0, height);
  walls.push(new Wall(p1, p2));
  p1 = createVector(0,height);
  p2 = createVector(width/2, height);
  walls.push(new Wall(p1, p2));
  p1 = createVector(width/2,0);
  p2 = createVector(width/2, height);
  walls.push(new Wall(p1, p2));
}

function drawWalls() {
  for (let wall of walls) {
    wall.draw();
  }
}

function draw3d(rays) {
  noStroke();
  let width_start = width/2;
  let bar_width = width/2/rays.length;
  for (let i = 0; i < rays.length; i++) {
    let ray = rays[i]
    if(ray.cast != null) {
      let ray_len = ray.pos.dist(ray.cast);
      let max_len = sqrt(4 * pow(height,2) + pow(width,2)) / 2;
      let bar_height = map(ray_len, 0, max_len, height*0.8, height * 0.05);


      fill(map(ray_len, 0, max_len, 255, 255*0.1), 0, 0);
      rect(
        width_start + bar_width * i,
        height / 2 - bar_height / 2,
        bar_width + 1,
        bar_height,
      )
    }
  }
}

function setup() {
  createCanvas(800, 400);

  generateWalls();

  player = new Player();

  datSetup();
}

function draw() {
  background(0);
  drawWalls();
  player.update();
  player.draw();
  let rays = player.raycast();
  for (let ray of rays) {
    ray.draw()
  }
  draw3d(rays);
}
