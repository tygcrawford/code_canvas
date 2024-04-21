const params = {
};

params.reset = () => {
};

function datSetup() {
  var gui = new dat.GUI({ name: "Sorting Visualizer Params" });
  gui.add(params, "reset");
  gui.close();
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
}
