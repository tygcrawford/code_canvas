class Player {
  constructor() {
    this.pos = createVector(random(0, width/2), random(0, height));
    this.dir = createVector(1, 1).normalize();
  }

  raycast() {
    let rays = [];
    let startDir = p5.Vector.rotate(
      this.dir,
      (-1 * PI * 2 * params.fov) / 360 / 2
    );
    for (let i = 1; i <= params.rays; i++) {
      rays.push(new Ray(this.pos, startDir.copy()));
      startDir.rotate((PI * 2 * params.fov) / 360 / params.rays);
    }
    for (let r of rays) {
      let p;
      for (let wall of walls) {
        let c = r.cast(wall);
        if (p == undefined || p == null) p = c;
        else if (c != null) {
          if (r.pos.dist(c) < r.pos.dist(p)) p = c;
        }
      }
      strokeWeight(1);
      if (p != null && p != undefined) line(r.pos.x, r.pos.y, p.x, p.y);
    }
  }

  draw() {
    stroke(255);
    strokeWeight(10);
    point(this.pos);
    strokeWeight(1);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.dir.x * 10,
      this.pos.y + this.dir.y * 10
    );
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.dir.rotate((-PI / 180) * 2);
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.dir.rotate((PI / 180) * 2);
    }

    if (keyIsDown(UP_ARROW)) {
      this.pos.add(this.dir);
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.pos.sub(this.dir);
    }
  }
}
