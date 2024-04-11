class Player {
  constructor() {
    this.pos = createVector(random(0, width / 2), random(0, height));
    this.dir = createVector(1, 1).normalize();
  }

  genRaysPlayer() {
    let rays = [];
    let startDir = p5.Vector.rotate(
      this.dir,
      (-1 * PI * 2 * params.fov) / 360 / 2
    );

    for (let i = 1; i <= params.rays; i++) {
      rays.push(new Ray(this.pos, startDir.copy()));
      startDir.rotate((PI * 2 * params.fov) / 360 / params.rays);
    }

    return rays;
  }

  genRaysScreenStraight() {
    let rays = [];
    let rightV = p5.Vector.rotate(this.dir, HALF_PI)
    rightV.mult(params.fov / params.rays)
    let startPos = p5.Vector.mult(this.dir, params.screen_dist)
    startPos.add(this.pos)
    startPos.sub(
      p5.Vector.mult(rightV, params.rays / 2)
    )

    for (let i = 0; i < params.rays; i++) {
      rays.push(new Ray(startPos.copy(), this.dir.copy()))
      startPos.add(rightV)
    }

    return rays;
  }

  genRaysScreenShifted() {
    let rays = [];
    let startDir = p5.Vector.rotate(
      this.dir,
      (-1 * PI * 2 * params.fov) / 360 / 2
    );

    let rightV = p5.Vector.rotate(this.dir, HALF_PI)
    rightV.mult(params.fov / params.rays)
    let startPos = p5.Vector.mult(this.dir, params.screen_dist)
    startPos.add(this.pos)
    startPos.sub(
      p5.Vector.mult(rightV, params.rays / 2)
    )

    for (let i = 0; i < params.rays; i++) {
      rays.push(new Ray(startPos.copy(), startDir.copy()))
      startPos.add(rightV)
      startDir.rotate((PI * 2 * params.fov) / 360 / params.rays);
    }

    return rays;
  }

  genRaysCorrect() {
    // NOTE needs work!!!
    let rays = [];
    //let projection_plane_width = tan(radians(params.fov));
    let projection_plane_width = sin(radians(params.fov) / 2) * params.screen_dist * 2;
    let projection_plane_distance = params.screen_dist;
    let cell_width = projection_plane_width / params.rays;

    let rightV = p5.Vector.rotate(this.dir, HALF_PI)
    rightV.mult(cell_width)

    let rayStart = p5.Vector.mult(this.dir, projection_plane_distance)
    let half_plane = p5.Vector.mult(rightV, params.rays / 2)
    rayStart.sub(half_plane)
    let half_cell = p5.Vector.mult(rightV, 0.5)
    rayStart.add(half_cell)
    let rayDir = rayStart.copy()

    for (let cell = 0; cell < params.rays; cell++) {
      let pointc = p5.Vector.add(this.pos, rayDir)
      strokeWeight(1)
      stroke(255, 0, 0)
      point(pointc)
      rays.push(new Ray(this.pos.copy(), rayDir.copy().normalize()))
      rayDir.add(rightV);
    }

    return rays;
  }

  raycast(genRays) {
    let rays = genRays();

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
          if (ray.pos.dist(current_ray) < ray.pos.dist(min_ray)) {
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
