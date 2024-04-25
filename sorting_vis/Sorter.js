class Sorter {
  constructor(arr) {
    this.arr = arr;
  }

  bubbleSortInit() {
    this.i = 0;
    this.j = 0;
  }

  bubbleSortStep() {
    if (this.i == this.arr.length) return;
    if (this.j == this.arr.length - this.i - 1) {
      this.j = 0;
      this.i++;
    }
    if (this.arr[this.j] > this.arr[this.j + 1]) {
      [this.arr[this.j], this.arr[this.j + 1]] = [this.arr[this.j + 1], this.arr[this.j]];
    }
    this.j++;
  }

  checkSorted() {
    for (let i = 0; i < this.arr.length - 1; i++) {
      if (this.arr[i + 1] < this.arr[i]) return false;
    }
    return true;
  }
}
