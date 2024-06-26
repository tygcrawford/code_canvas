let s;

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

  let arr = generateSortedArr(50);
  randomizeArr(arr);
  s = new Sorter(arr);
  s.bubbleSortInit();

  noStroke();
}

function draw() {
  background(0);
  drawArr(s.arr);
  s.bubbleSortStep();
}

function drawArr(arr) {
  let max = Math.max(...arr)
  let bar_width = width / arr.length
  for (let i = 0; i < arr.length; i++) {
    let bar_height = (height / max) * arr[i]
    fill(255)
    rect(i * bar_width, height - bar_height, bar_width - 1, bar_height)
  }
}
