class Vector  {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y === undefined ? this.x : y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	setMagnitude(n) {
		return this.normalize().multiply(new Vector(n));
	}

	setAngle(angle) {
		return Vector.fromAngle(angle).multiply(new Vector(this.magnitude));
	}

	magnitude() {
		return this.distance(new Vector(0,0));
	}
	
	angle() {
		return new Vector(0,0).angleToV(this);
	}

	equals(v) {
		return this.x === v.x && this.y === v.y;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	multiply(v) {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}

	divide(v) {
		this.x /= v.x;
		this.y /= v.y;
		this.x = this.x || 0;
		this.y = this.y || 0;
		return this;
	}

	mod(v) {
		this.x %= v.x;
		this.y %= v.y;
		return this;
	}

	normalize() {
		let m = this.magnitude();
		this.divide(new Vector(m));
		return this;
	}

	limit(n) {
		let m = this.magnitude();
		if(m > n) {
			this.multiply(new Vector(n/m));
		}
		return this;
	}

	distance(v)	{
		var a = Math.pow(v.x - this.x, 2);
		var b = Math.pow(v.y - this.y, 2);
		return Math.sqrt(a + b);
	}

	angleToV(v) {
		return Math.atan2(v.y - this.y, v.x - this.x);
	}


	// static functions

	static add(v1, v2) {
		return new Vector(v1.x+v2.x, v1.y+v2.y);
	}

	static subtract(v1, v2) {
		return new Vector(v1.x-v2.x, v1.y-v2.y);
	}

	static multiply(v1, v2) {
		return new Vector(v1.x*v2.x, v1.y*v2.y);
	}

	static divide(v1, v2) {
		return new Vector(v1.x/v2.x, v1.y/v2.y);
	}

	static mod(v1, v2) {
		return new Vector(v1.x%v2.x, v1.y%v2.y);
	}

	static fromAngle(angle) {
		return new Vector(Math.cos(angle),Math.sin(angle))
	}
}