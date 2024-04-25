// Array Generators
function generateSortedArr(elms) {
  let arr = [];
  for (let i = 1; i <= elms; i++) {
    arr.push(i);
  }
  return arr;
}

function generateFewUniqueArr(elms, step) {
  let arr = [];
  for (let i = 1; i <= elms; i++) {
    arr.push(Math.floor((i + step) / step));
  }
  return arr;
}

// Array Modifiers
function reverseArr(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

function randomizeArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let r = Math.floor(random(0, arr.length))
    if (r != i) {
      [arr[i], arr[r]] = [arr[r], arr[i]]
    }
  }
}

function barelyRandomizeArr(arr, range, p) {
  for (let i = 0; i < arr.length; i++) {
    let r = Math.round(random(0, range * 2)) - range;
    if (Math.random() < p && r != 0 && i + r >= 0 && i + r < arr.length) {
      [arr[i], arr[i + r]] = [arr[i + r], arr[i]]
    }
  }
}

