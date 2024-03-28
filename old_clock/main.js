const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");

class Clock {
	constructor() {
		this.updateT();
		this.updateR();
	}
	
	updateT() {
		var time = new Date().getTime();
		this.secT = (time/1000) % 60;
		this.minT = (time/1000/60) % 60;
		this.hourT = (time/1000/60/60) + 8;
		this.hourT = this.hourT % 12;
	}
	
	updateR() {
		this.secR = this.map(this.secT, 0, 60, 0, 2*Math.PI);
		this.minR = this.map(this.minT, 0, 60, 0, 2*Math.PI);
		this.hourR = this.map(this.hourT, 0, 12, 0, 2*Math.PI);
	}
	
	getT() {
		return [this.hourT, this.minT, this.secT];
	}

	getR() {
		return [this.hourR, this.minR, this.secR];
	}

	update(){
		this.updateR();
		this.updateT();
	}
	
	map(input, low, high, lowA, highA) {
		return ((input / (high - low)) * (highA - lowA)) + lowA;
	}
}

function circle(col, size){
	ctx.strokeStyle = "rgb("+col+")";
	ctx.beginPath();
	ctx.arc(200, 200, size, 0, 2 * Math.PI);
	ctx.stroke();
}

function update() {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, cnv.width, cnv.height);
	ctx.lineWidth = 5;
	ctx.lineCap = "round";
	circle("30,5,5", 175);
	circle("25,35,10", 165);
	circle("5,15,35", 155);
	ctx.strokeStyle = "rgb(255, 0, 45)";
	ctx.beginPath();
	ctx.arc(200, 200, 175, (Math.PI*3)/2, c.getR()[2] - (Math.PI) / 2);
	ctx.stroke();
	ctx.strokeStyle = "rgb(15, 245, 15)";
	ctx.beginPath();
	ctx.arc(200, 200, 165, (Math.PI*3)/2, c.getR()[1] - (Math.PI) / 2);
	ctx.stroke();
	ctx.strokeStyle = "rgb(0, 200, 235)";
	ctx.beginPath();
	ctx.arc(200, 200, 155, (Math.PI*3)/2, c.getR()[0] - (Math.PI) / 2);
	ctx.stroke();
}

var c = new Clock();

setInterval(function(){
	c.update();
	console.log(c.getT());
	update();
}, 50);