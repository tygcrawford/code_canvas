const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distance(point)	{
		var a = Math.pow(point.x - this.x, 2);
		var b = Math.pow(point.y - this.y, 2);
		return Math.sqrt(a + b);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}

	move(x_amnt, y_amnt) {
		this.x += x_amnt;
		this.y += y_amnt;
	}

	equals(point) {
		if(this.x === point.x && this.y === point.y) {
			return true;
		} else {
			return false;
		}
	}

	slope(point) {
		var a = this.y - point.y;
		var b = this.x - point.x;
		return a / b;
	}

	radians(point) {
		return Math.atan2(point.y - this.y, point.x - this.x);
	}

	distanceMovable(point, speed) {
		var rad = this.radians(point);
		return {
			x: Math.cos(rad) * speed,
			y: Math.sin(rad) * speed
		};
	}

	toString() {
		return "(" + this.x + ", " + this.y + ")";
	}
}

class Car {
	constructor(x, y) {
		this.home = new Point(x, y);
		this.pos = new Point(x, y);
		this.diameter = 5;
		this.distance = 50;
		this.speed = 2;
	}
	
	update(mouse) {
		if(this.pos.distance(mouse) < this.distance){
			var mvbl = this.pos.distanceMovable(mouse, this.speed);
			this.pos.move(-1*mvbl.x, -1*mvbl.y);
		} else {
			if(this.pos.distance(this.home) <= this.speed){
				if(!this.pos.equals(this.home)){
					this.pos.set(this.home.x, this.home.y);
				}
			} else {
				var mvbl = this.home.distanceMovable(this.pos, this.speed);
				this.pos.move(-mvbl.x, -mvbl.y);
			}
		}
	}
	
	render(ctx) {
		ctx.fillStyle = "#FFF";
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.diameter, 0, 2*Math.PI);
		ctx.fill();
	}
}

var mouse = new Point(0, 0);

var cars = [];

for(var y=1; y<20; y++){
	for(var x=1; x<20; x++){
		cars[cars.length] = new Car(x*20, y*20);
	}
}

function main(){
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, cnv.width, cnv.height);
	
	for(var i = 0; i < cars.length; i++){
		cars[i].update(mouse);
		cars[i].render(ctx);
	}

	requestAnimationFrame(main);
}

cnv.addEventListener('mousemove', function(evt) {
	var rect = cnv.getBoundingClientRect();
	mouse.set(evt.clientX - rect.left, evt.clientY - rect.top);
}, false);

cnv.addEventListener('click', function(evt) {
	var rect = cnv.getBoundingClientRect();
	cars[cars.length] = new Car(evt.clientX - rect.left, evt.clientY - rect.top);
}, false);

window.onload = main();