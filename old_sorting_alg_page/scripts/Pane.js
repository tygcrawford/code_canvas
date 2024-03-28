class Pane {
  constructor(cnv) {
    this.cnv = cnv;
    this.ctx = cnv.getContext("2d");

    this.resizeCanvas();
  }

  draw(array, comparisons = []) {
    let bar_width = this.cnv.width / array.length;

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);

    this.ctx.fillStyle = "#FFF";
    for (var i = 0; i < array.length; i++) {
      if (comparisons.includes(i)) {
        this.ctx.fillStyle = "#F00";
        this.ctx.fillRect(
          i * bar_width,
          this.cnv.height -
            this.map(array[i], 0, array.length, 0, this.cnv.height),
          bar_width,
          this.map(array[i], 0, array.length, 0, this.cnv.height)
        );
        this.ctx.fillStyle = "#FFF";
      } else {
        this.ctx.fillRect(
          i * bar_width,
          this.cnv.height -
            this.map(array[i], 0, array.length, 0, this.cnv.height),
          bar_width,
          this.map(array[i], 0, array.length, 0, this.cnv.height)
        );
      }
    }
  }

  map(original, in1, in2, out1, out2) {
    return ((original - in1) * (out2 - out1)) / (in2 - in1) + out1;
  }

  resizeCanvas() {
    this.cnv.width = document.documentElement.clientWidth;
    this.cnv.height = document.documentElement.clientHeight - 60;
    // this.draw()
  }

  handleEvent(event) {
    if (event.type == "resize") {
      this.resizeCanvas();
    }
  }
}
