let points;
let cubic, quadratic;
let mouse;

let t;

const params = {
};

params.reset = () => {
};

function datSetup() {
  var gui = new dat.GUI({ name: "Bezier Curves Params" });
  gui.add(params, "reset");
  gui.close();
}

function setup() {
  createCanvas(800, 400);

  mouse = new Mouse();

  points = []

  let p1 = new Point(50, 200)
  let p2 = new Point(350, 200)
  let cp1 = new Point(50, 50)
  let cp2 = new Point(350, 50)

  cubic = new CubicBezier(p1.pos, p2.pos, cp1.pos, cp2.pos);

  points.push(p1);
  points.push(p2);
  points.push(cp1);
  points.push(cp2);

  p1 = new Point(450, 200)
  p2 = new Point(750, 200)
  let cp = new Point(600, 50)

  quadratic = new QuadraticBezier(p1.pos, p2.pos, cp.pos)

  points.push(p1)
  points.push(p2)
  points.push(cp)

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

  cubic.update(t);
  cubic.draw();

  quadratic.update(t)
  quadratic.draw();
}

function mousePressed() {
  mouse.pressed(points)
}

function mouseReleased() {
  mouse.released()
}

