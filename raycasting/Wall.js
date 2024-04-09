class Wall {
  constructor(p1, p2) {
    if (p1 == undefined) this.p1 = createVector(random(0, width/2), random(0, height));
    else this.p1 = p1;
    if (p2 == undefined) this.p2 = createVector(random(0, width/2), random(0, height));
    else this.p2 = p2;
  }

  draw() {
    strokeWeight(1);
    stroke(255);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}
