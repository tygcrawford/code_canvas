let cells;
const params = {
  size: 200
};

const table = {
  "0000": [],
  "0001": [[[0.5, 0], [0, 0.5]]],
  "0010": [[[0.5, 0], [1, 0.5]]],
  "0011": [[[1, 0.5], [0, 0.5]]],
  "0100": [[[1, 0.5], [0.5, 1]]],
  "0101": [[[0.5, 0], [0, 0.5]], [[1, 0.5], [0.5, 1]]],
  "0110": [[[0.5, 0], [0.5, 1]]],
  "0111": [[[0.5, 1], [0, 0.5]]],
  "1000": [[[0.5, 1], [0, 0.5]]],
  "1001": [[[0.5, 0], [0.5, 1]]],
  "1010": [[[0.5, 0], [1, 0.5]], [[0.5, 1], [0, 0.5]]],
  "1011": [[[1, 0.5], [0.5, 1]]],
  "1100": [[[1, 0.5], [0, 0.5]]],
  "1101": [[[0.5, 0], [1, 0.5]]],
  "1110": [[[0.5, 0], [0, 0.5]]],
  "1111": []
}

params.reset = () => {
};

function datSetup() {
  var gui = new dat.GUI({ name: "Marching Squares Params" });
  gui.add(params, "reset");
  gui.close();
}

function setup() {
  createCanvas(400, 400);
}

function noiseAtPoint(x, y) {
  const noiseScale = 0.009
  const noiseX = noiseScale * x
  const noiseY = noiseScale * y
  const noiseT = noiseScale * frameCount
  return noise(noiseX, noiseY, noiseT)
}

function cornersforSquare(x, y, c) {
  let corners = "";
  corners += round(noiseAtPoint(x, y + c)) ? "1" : "0"
  corners += round(noiseAtPoint(x + c, y + c)) ? "1" : "0"
  corners += round(noiseAtPoint(x + c, y)) ? "1" : "0"
  corners += round(noiseAtPoint(x, y)) ? "1" : "0"
  return corners
}

function linesForSquare(x, y, c, corners) {
  const lines = table[corners]
  for (let l of lines) {
    const [p1, p2] = l
    const [p1x, p1y] = p1
    const [p2x, p2y] = p2
    stroke(255)
    strokeWeight(1)
    line(p1x * c + x, p1y * c + y, p2x * c + x, p2y * c + y)
  }
}

function draw() {
  background(0);
  const cellSize = width / params.size
  for (let y = 0; y < params.size; y++) {
    for (let x = 0; x < params.size; x++) {
      const scaledX = x * cellSize
      const scaledY = y * cellSize
      const corners = cornersforSquare(scaledX, scaledY, cellSize)
      linesForSquare(scaledX, scaledY, cellSize, corners)
    }
  }
}
