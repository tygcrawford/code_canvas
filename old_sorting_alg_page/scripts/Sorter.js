async function bubblesort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array.isGreater(j, j + 1)) {
        array.swap(j, j + 1);
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, 100));
    }
  }
}

async function partition(array, low, high) {
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array.isLess(j, high)) {
      i++;
      array.swap(i, j);
      await new Promise((r) => setTimeout(r, 100));
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  array.swap(i + 1, high);
  return i + 1;
}

async function quicksort(array, low, high) {
  if (low < high) {
    let p = await partition(array, low, high);

    quicksort(array, low, p - 1);
    quicksort(array, p + 1, high);
  }
}

async function selectionsort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array.isGreater(min, j)) {
        min = j;
      }
      await new Promise((r) => setTimeout(r, 100));
    }
    if (min !== i) array.swap(min, i);
    await new Promise((r) => setTimeout(r, 100));
  }
}
