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
    const a_distance = 100;
    const a_strength = 1;

    let avg = createVector();
    let neighbors = 0;
    let distance;
    for (let boid of boids) {
      distance = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
      if (boid != this && distance < a_distance) {
        avg.add(boid.vel);
        neighbors++;
      }
    }
    if (neighbors > 0) {
      avg.div(neighbors);
      avg.sub(this.vel);
    }
    return avg.mult(a_strength);
  }

  cohesion(boids) {
    const c_distance = 100;
    const c_strength = 1;

    let avg = createVector();
    let neighbors = 0;
    let distance;
    for (let boid of boids) {
      distance = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
      if (boid != this && distance < c_distance) {
        avg.add(boid.pos);
        neighbors++;
      }
    }
    if (neighbors > 0) {
      avg.div(neighbors);
      avg.sub(this.pos);
    }
    return avg.mult(c_strength);
  }

  seperation(boids) {
    const s_distance = 25;
    const s_strength = 1;

    let close = createVector();
    let distance;
    for (let boid of boids) {
      distance = dist(this.pos.x, this.pos.y, boid.pos.x, boid.pos.y);
      if (boid != this && distance < s_distance) {
        close.add(p5.Vector.sub(this.pos, boid.pos));
      }
    }
    return close.mult(s_strength);
  }

  flock(boids) {
    let alignment = this.alignment(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }

  draw() {
    point(this.pos);
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
      strokeWeight(10);
      boid.draw();
      strokeWeight(1);
      line(
        boid.pos.x,
        boid.pos.y,
        boid.pos.x + boid.vel.x * 10,
        boid.pos.y + boid.vel.y * 10
      );
    }
  }
}
