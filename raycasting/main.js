let player;
let walls;
const params = {
  walls: 5,
  fov: 135,
  rays: 60,
};

params.reset = () => {};

function datSetup() {
  var gui = new dat.GUI({ name: "Raycasting Params" });
  gui.add(params, "reset");
  gui.close();
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
  player.raycast();
}
