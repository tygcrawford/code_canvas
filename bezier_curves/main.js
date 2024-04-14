let points;
let curve;
let mouse;

let t;

const params = {
};

params.reset = () => {
};

function datSetup() {
  var gui = new dat.GUI({ name: "Bezier Curves Params" });
  // gui.add(params, "t", 0, 1, 0.01);
  gui.add(params, "reset");
  gui.close();
}

function setup() {
  createCanvas(400, 400);
  datSetup()

  mouse = new Mouse();

  points = []

  let p1 = new Point(300, 100)
  let p2 = new Point(100, 300)
  let cp = new Point(100, 100)

  curve = new QuadraticBezier(p1.pos, p2.pos, cp.pos);

  points.push(p1);
  points.push(p2);
  points.push(cp);
  t = 0;
}

function draw() {
  mouse.update(points)

  t = sin(millis() / 1000) * 0.5 + 0.5

  background(0);

  for (let point of points) {
    point.update()
    point.draw()
  }

  curve.update(t);
  curve.draw();
}

function mousePressed() {
  mouse.pressed(points)
}

function mouseReleased() {
  mouse.released()
}

