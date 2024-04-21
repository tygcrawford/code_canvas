class Mouse {
  constructor() {
    this.pos = createVector(0, 0);
    this.grabbing = null;
  }

  checkPoints(points) {
    for (let point of points) {
      if (this.pos.dist(point.pos) < point.size / 2) return point
    }
  }

  update(points) {
    this.pos.set(mouseX, mouseY)
    if (this.grabbing != null) {
      this.grabbing.pos.set(this.pos)
      return
    }
    let point = this.checkPoints(points)
    if (point != null) {
      cursor('grab')
    } else {
      cursor(ARROW)
    }
  }

  updateGrabbing() {
    let x = constrain(this.pos.x, this.grabbing.size / 2, width - this.grabbing.size / 2)
    let y = constrain(this.pos.x, this.grabbing.size / 2, height - this.grabbing.size / 2)
    this.grabbing.pos.set(x, y)
  }

  pressed(points) {
    let point = this.checkPoints(points)
    if (point != null) {
      this.grabbing = point
      cursor('grabbing')
    }
  }

  released() {
    this.grabbing = null
    cursor('grab')
  }
}
