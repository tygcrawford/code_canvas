class QuadraticBezier {
  constructor(p1, p2, cp) {
    this.p1 = p1
    this.p2 = p2
    this.cp = cp

    this.lerpPoints(0)

    this.curve = true
    this.maxPoints = 400
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
    if (mouse.grabbing) this.points = [];
    this.lerpPoints(t)
  }

  drawCurve() {
    for (let p = 0; p < this.points.length - 1; p++) {
      stroke(0, 0, 255)
      strokeWeight(1)
      vLine(this.points[p], this.points[p + 1])
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

class CubicBezier {
  constructor(p1, p2, cp1, cp2) {
    this.p1 = p1
    this.p2 = p2

    this.cp1 = cp1
    this.cp2 = cp2

    this.lerpPoints(0)

    this.curve = true
    this.maxPoints = 400
    this.points = []
  }

  lerpPoints(t) {
    this.lp1 = p5.Vector.lerp(this.p1, this.cp1, t)
    this.lp2 = p5.Vector.lerp(this.cp1, this.cp2, t)
    this.lp3 = p5.Vector.lerp(this.cp2, this.p2, t)

    this.llp1 = p5.Vector.lerp(this.lp1, this.lp2, t)
    this.llp2 = p5.Vector.lerp(this.lp2, this.lp3, t)

    this.lllp = p5.Vector.lerp(this.llp1, this.llp2, t)

    if (this.curve) {
      if (this.points.length == this.maxPoints) this.points.shift()
      this.points.push(this.lllp.copy())
    }
  }

  update(t) {
    if (mouse.grabbing) this.points = [];
    this.lerpPoints(t)
  }

  drawCurve() {
    for (let p = 0; p < this.points.length - 1; p++) {
      stroke(0, 0, 255)
      strokeWeight(1)
      vLine(this.points[p], this.points[p + 1])
    }
  }

  draw() {
    stroke(255)
    strokeWeight(1)
    vLine(this.p1, this.cp1)
    vLine(this.cp1, this.cp2)
    vLine(this.cp2, this.p2)

    stroke(255, 0, 0)
    strokeWeight(5)
    point(this.lp1)
    point(this.lp2)
    point(this.lp3)
    strokeWeight(1)
    vLine(this.lp1, this.lp2)
    vLine(this.lp2, this.lp3)

    stroke(0, 255, 0)
    strokeWeight(5)
    point(this.llp1)
    point(this.llp2)
    strokeWeight(1)
    vLine(this.llp1, this.llp2)

    stroke(0, 0, 255)
    strokeWeight(5)
    point(this.lllp)

    if (this.curve) this.drawCurve()
  }
}
