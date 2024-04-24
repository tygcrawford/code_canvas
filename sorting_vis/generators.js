function generateSortedArr(elms) {
  let arr = [];
  for (let i = 1; i <= elms; i++) {
    arr.push(i);
  }
  return arr;
}

function generateRandomArr(elms) {
  let arr = generateSortedArr(elms);
  for (let i = 0; i < elms; i++) {
    r = Math.floor(random(0, elms))
    if (r != i) {
      [arr[i], arr[r]] = [arr[r], arr[i]]
    }
  }
  return arr;
}

function generateReverseArr(elms) {
  let arr = [];
  for (let i = elms; i >= 1; i--) {
    arr.push(i);
  }
  return arr;
}
