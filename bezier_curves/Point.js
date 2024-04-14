class Point {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 10
  }

  update() {
  }

  draw() {
    stroke(255)
    strokeWeight(this.size)
    point(this.pos)
  }
}
