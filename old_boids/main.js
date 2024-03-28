const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const width = 800;
const height = 400;

const boidBase = 7;
const boidHeight = 12;
const boidMaxSpeed = 10;
const boidMaxForce = 0.03;
const friction = -0.12;
const vision = 100;

class Stage {
	constructor(cnv, ctx) {
		this.cnv = cnv;
		this.ctx = ctx;
		this.cnv.width = width;
		this.cnv.height = height;
	}

	update() {

	}

	draw() {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
	}
}

class Flock {
	constructor(boids) {
		this.boids = boids;
	}

	update(cnv) {
		this.boids.forEach((boid) => {
			boid.flock(this);
			boid.update(cnv);
		});
	}

	draw(ctx) {
		this.boids.forEach((boid) => {
			boid.draw(ctx);
		});
	}

	getCenter() {
		let center = new Vector();
		this.boids.forEach((boid) => {
			center.add(boid.pos);
		});
		center.divide(new Vector(this.boids.length));
		return center;
	}
}

class Boid {
	constructor() {
		// this.pos = new Vector(cnv.width/2,cnv.height/2);
		this.pos = new Vector(_.random(cnv.width), _.random(cnv.height));
		// this.vel = new Vector();
		let ang = _.random(360);
		this.vel = new Vector(Math.cos(ang), Math.sin(ang));
		this.acc = new Vector();

		this.maxspeed = boidMaxSpeed;
		this.maxforce = boidMaxForce;

		this.base = boidBase;
		this.height = boidHeight;
	}

	update(cnv) {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		
		this.pos.mod(new Vector(cnv.width, cnv.height));
		if(this.pos.x < 0) {
			this.pos.x += cnv.width;
		}
		if(this.pos.y < 0) {
			this.pos.y += cnv.height;
		}

		this.acc.multiply(new Vector(0));
	}

	draw(ctx) {
		ctx.fillStyle = "#FFFFFF";
		
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.pos.x+this.height/2, this.pos.y+this.base/2);
		ctx.rotate(this.vel.angle());
		ctx.moveTo(this.height/2, 0);
		ctx.lineTo(-this.height/2, -this.base/2);
		ctx.lineTo(-this.height/2, this.base/2);
		ctx.fill();
		ctx.restore();

		// ctx.beginPath();
		// ctx.arc(this.pos.x, this.pos.y, 5, 0, 2*Math.PI);
		// ctx.fill();
	}

	flock(f) {
		let c = this.cohesion(f);
		this.acc.add(c);

		let a = this.alignment(f);
		this.acc.add(a);

		let s = this.seperation(f);
		this.acc.add(s);
	}

	scale(v) {
		let desired = v.normalize().setMagnitude(this.maxspeed);
		return desired.subtract(this.vel).limit(this.maxforce);
	}

	getCloseBoids(flock) {
		let close = [];
		flock.boids.forEach((b) => {
			let dist = this.pos.distance(b.pos);
			if(dist > 0 && dist < vision) {
				close.push(b);
			}
		});
		return close;
	}

	cohesion(flock) {
		return this.scale(flock.getCenter().subtract(this.pos));
	}

	seperation(flock) {
		let close = this.getCloseBoids(flock);
		let seperate = close.reduce((a, c) => {
				return a.add(Vector.subtract(this.pos, c.pos));
			}, new Vector())
			.divide(close.length);
		
		return seperate;
	}

	alignment(flock) {	
		let close = this.getCloseBoids(flock);
		let avg = close.reduce((a, c) => {
				return a.add(c.vel);
			}, new Vector())
			.divide(close.length);
		return avg;
		// return this.scale(avg);
	}
}

let stage = new Stage(cnv, ctx);
// let boids = [new Boid(), new Boid(), new Boid(), new Boid(), new Boid(), new Boid(), new Boid(), new Boid()];
let boids = [];
_.times(50, () => {
	boids.push(new Boid());
});
let flock = new Flock(boids);

function main() {
	stage.update();
	flock.update(stage.cnv);
	stage.draw();
	flock.draw(stage.ctx);
	requestAnimationFrame(main);
}

window.onload = main();