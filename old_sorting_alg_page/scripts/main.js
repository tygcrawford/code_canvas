function main() {
  const fps = 30;

  const cnv_id = "bbl";
  const cnv_obj = document.getElementById(cnv_id);

  const pane = new Pane(cnv_obj);

  window.addEventListener("resize", pane);

  const arr = new ObservableArray(pane.draw.bind(pane));

  let size = 50;
  arr.buildRandom(size);

  // bubblesort(arr);
  // selectionsort(arr);
  quicksort(arr, 0, size);
}

window.onload = function () {
  main();
};
