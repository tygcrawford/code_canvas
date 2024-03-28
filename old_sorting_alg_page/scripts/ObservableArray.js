class ObservableArray {
  constructor(observer) {
    this.observer = observer;
    this.array = [];
    this.length = 0;
  }

  alertObsever(comparisons = []) {
    this.observer(this.array, comparisons);
  }

  reset() {
    this.array = [];
    this.length = 0;
  }

  isGreater(index1, index2) {
    this.alertObsever([index1, index2]);
    return this.array[index1] > this.array[index2];
  }

  isLess(index1, index2) {
    this.alertObsever([index1, index2]);
    return this.array[index1] < this.array[index2];
  }

  push(elm) {
    this.array.push(elm);

    this.length++;

    this.alertObsever();
  }

  pushNoAlert(elm) {
    this.array.push(elm);

    this.length++;
  }

  swap(index1, index2) {
    [this.array[index1], this.array[index2]] = [
      this.array[index2],
      this.array[index1],
    ];

    this.alertObsever([index1, index2]);
  }

  swapNoAlert(index1, index2) {
    [this.array[index1], this.array[index2]] = [
      this.array[index2],
      this.array[index1],
    ];
  }

  get(index) {
    return this.array[index];
  }

  buildSequential(size) {
    this.array = [];
    this.length = 0;

    for (let i = 0; i < size; i++) {
      this.pushNoAlert(i);
    }

    this.alertObsever();
  }

  randomize(times) {
    for (let i = 0; i < times; i++) {
      this.swapNoAlert(
        Math.floor(Math.random() * this.array.length),
        Math.floor(Math.random() * this.array.length)
      );
    }

    this.alertObsever();
  }

  buildRandom(size) {
    this.buildSequential(size);
    this.randomize(size);
  }
}
