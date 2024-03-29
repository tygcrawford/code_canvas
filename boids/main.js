let flock;

function setup() {
  createCanvas(600, 600);
  flock = new Flock(20);
}

function draw() {
  background(220);
  flock.draw();
  flock.update();
}
