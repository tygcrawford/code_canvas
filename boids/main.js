let flock;
const params = {
  visible_range: 40,
  close_range: 8,
  alignment_factor: 0.05,
  seperation_factor: 0.05,
  cohesion_factor: 0.0005,
  margin: 50,
  edge_avoidance: 0.2,
  max_speed: 2,
  min_speed: 1,
  boids_num: 20,
};

params.reset = () => {
  flock = new Flock(params.boids_num);
};

function datSetup() {
  var gui = new dat.GUI({ name: "My GUI" });
  gui.add(params, "visible_range", 0, 200);
  gui.add(params, "close_range", 0, 200);
  gui.add(params, "alignment_factor", 0, 0.1);
  gui.add(params, "seperation_factor", 0, 0.1);
  gui.add(params, "cohesion_factor", 0, 0.1);
  gui.add(params, "margin", 0, 200);
  gui.add(params, "edge_avoidance", 0, 1);
  gui.add(params, "max_speed", 0, 20);
  gui.add(params, "min_speed", 0, 20);
  gui.add(params, "boids_num", 0, 100).onChange(params.reset);
  gui.add(params, "reset");
  gui.close();
}

function setup() {
  createCanvas(600, 600);

  datSetup();

  flock = new Flock(20);
}

function draw() {
  background(220);
  flock.update();
  flock.draw();
}
