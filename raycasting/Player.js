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
    for (let ray of rays) {
      let min_ray = null;
      let min_wall = null;
      for (let wall of walls) {
        let current_ray = ray.raycast(wall);
        if (min_ray == null) {
          min_ray = current_ray;
          min_wall = wall;
        }
        else if (current_ray != null) {
          if (ray.pos.dist(current_ray) < ray.pos.dist(min_ray)){
            min_ray = current_ray;
            min_wall = wall;
          }
        }
      }
      ray.cast = min_ray;
      ray.wall = min_wall;
    }
    return rays;
  }

  raycast_flat() {
    let rays = [];
    let rightV = p5.Vector.rotate(this.dir, -1*HALF_PI)
    rightV.mult(params.fov/params.rays)
    let startPos = p5.Vector.mult(this.dir, params.screen_dist)
    startPos.add(this.pos)
    startPos.sub(
      p5.Vector.mult(rightV, params.rays/2)
    )


    for(let i = 0; i < params.rays; i++) {
      rays.push(new Ray(startPos.copy(), this.dir.copy()))
      startPos.add(rightV)
    } 
    for (let ray of rays) {
      let min_ray = null;
      let min_wall = null;
      for (let wall of walls) {
        let current_ray = ray.raycast(wall);
        if (min_ray == null) {
          min_ray = current_ray;
          min_wall = wall;
        }
        else if (current_ray != null) {
          if (ray.pos.dist(current_ray) < ray.pos.dist(min_ray)){
            min_ray = current_ray;
            min_wall = wall;
          }
        }
      }
      ray.cast = min_ray;
      ray.wall = min_wall;
    }
    return rays;
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
