class Wall {
  constructor() {
    this.p1 = createVector(random(0, width/2), random(0, height));
    this.p2 = createVector(random(0, width/2), random(0, height));
  }

  draw() {
    strokeWeight(1);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}
