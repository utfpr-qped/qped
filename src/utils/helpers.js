
export default function helpers() {
  return Object.freeze({
    shuffleArray
  })
  //https://bost.ocks.org/mike/shuffle/
  function shuffleArray(array) {
    var copy = [], n = array.length, i;
    while (n) {
      i = Math.floor(Math.random() * array.length);
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    return copy;
  }
}
