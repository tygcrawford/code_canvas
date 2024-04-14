class QuadraticBezier {
  constructor(p1, p2, cp) {
    this.p1 = p1
    this.p2 = p2
    this.cp = cp

    this.lerpPoints(0)

    this.curve = true
    this.maxPoints = 200
    this.points = []
  }

  lerpPoints(t) {
    this.lp1 = p5.Vector.lerp(this.p1, this.cp, t)
    this.lp2 = p5.Vector.lerp(this.cp, this.p2, t)
    this.llp = p5.Vector.lerp(this.lp1, this.lp2, t);
    if (this.curve) {
      if (this.points.length == this.maxPoints) this.points.shift()
      this.points.push(this.llp.copy())
    }
  }

  update(t) {
    this.lerpPoints(t)
  }

  drawCurve() {
    for (let p of this.points) {
      stroke(0, 0, 255)
      strokeWeight(2)
      point(p)
    }
  }

  draw() {
    stroke(255, 0, 0)
    strokeWeight(5)
    point(this.lp1)
    point(this.lp2)
    strokeWeight(1)
    stroke(255)
    vLine(this.p1, this.cp)
    vLine(this.cp, this.p2)
    stroke(255, 0, 0)
    vLine(this.lp1, this.lp2)
    stroke(0, 0, 255)
    strokeWeight(5)
    point(this.llp)

    if (this.curve) this.drawCurve()
  }
}
