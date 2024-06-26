class Ray {
  constructor(pos, dir) {
    this.pos = pos;
    this.dir = dir;
    this.cast = null;
    this.wall;
  }

  raycast(line) {
    let x1 = line.p1.x;
    let y1 = line.p1.y;
    let x2 = line.p2.x;
    let y2 = line.p2.y;
    let x3 = this.pos.x + this.dir.x;
    let y3 = this.pos.y + this.dir.y;
    let x4 = this.pos.x;
    let y4 = this.pos.y;


    let t =
      ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) /
      ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    let u =
      ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) /
      ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    let intersection = t > 0 && t < 1 && u > 0;

    if (!intersection) return null;

    return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
  }

  horizontalIntersect() {
    if(this.wall == undefined) return false
    if(this.wall.p1.y == this.wall.p2.y) return true
    return false
  }

  verticalIntersect() {
    if(this.wall == undefined) return false
    if(this.wall.p1.x == this.wall.p2.x) return true
    return false
  }
  
  draw() {
    strokeWeight(1);
    if (this.cast != null) {
      stroke(255);
      line(this.pos.x, this.pos.y, this.cast.x, this.cast.y);
    }
  }
}
