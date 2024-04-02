class Boid {
  constructor() {
    this.pos = createVector(
      floor((Math.random() * width) / 2 + width / 4),
      floor((Math.random() * height) / 2 + height / 4)
    );

    const angle = floor(Math.random() * 360);
    this.vel = createVector(Math.cos(angle), Math.sin(angle));
    this.acc = createVector();
  }

  alignment(boids) {
    let avg = createVector();
    let neighbors = 0;
    let distance;
    for (let boid of boids) {
      distance = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
      if (
        boid != this &&
        distance < params.visible_range &&
        distance > params.close_range
      ) {
        avg.add(boid.vel);
        neighbors++;
      }
    }
    if (neighbors > 0) {
      avg.div(neighbors);
      avg.sub(this.vel);
    }
    return avg.mult(params.alignment_factor);
  }

  cohesion(boids) {
    let avg = createVector();
    let neighbors = 0;
    let distance;
    for (let boid of boids) {
      distance = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
      if (
        boid != this &&
        distance < params.visible_range &&
        distance > params.close_range
      ) {
        avg.add(boid.pos);
        neighbors++;
      }
    }
    if (neighbors > 0) {
      avg.div(neighbors);
      avg.sub(this.pos);
    }
    return avg.mult(params.cohesion_factor);
  }

  seperation(boids) {
    let close = createVector();
    let distance;
    for (let boid of boids) {
      distance = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
      if (boid != this && distance < params.close_range) {
        close.add(p5.Vector.sub(this.pos, boid.pos));
      }
    }
    return close.mult(params.seperation_factor);
  }

  edgeAvoidance() {
    let edge = createVector();
    if (this.pos.x < params.margin)
      edge.add(createVector(params.edge_avoidance, 0));
    if (this.pos.x > width - params.margin)
      edge.sub(createVector(params.edge_avoidance, 0));
    if (this.pos.y < params.margin)
      edge.add(createVector(0, params.edge_avoidance));
    if (this.pos.y > height - params.margin)
      edge.sub(createVector(0, params.edge_avoidance));
    return edge;
  }

  limitVel() {
    let vel = this.vel.mag();
    if (vel > params.max_speed) this.vel.setMag(params.max_speed);
    if (vel < params.min_speed) this.vel.setMag(params.min_speed);
  }

  flock(boids) {
    let alignment = this.alignment(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);
    let edgeAvoidance = this.edgeAvoidance();

    this.acc.set(0);
    this.acc.add(alignment);
    this.acc.add(cohesion);
    this.acc.add(seperation);
    this.acc.add(edgeAvoidance);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.limitVel();
  }

  draw() {
    strokeWeight(10);
    point(this.pos);
    strokeWeight(1);
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
  }
}

class Flock {
  constructor(n) {
    this.boids = [];

    for (let i = 0; i < n; i++) {
      this.boids.push(new Boid());
    }
  }

  update() {
    for (let boid of this.boids) {
      boid.flock(this.boids);
    }

    for (let boid of this.boids) {
      boid.update();
    }
  }

  draw() {
    for (let boid of this.boids) {
      boid.draw();
    }
  }
}
