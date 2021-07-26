export default function helpers() {
  return Object.freeze({
    shuffleArray,
    randomInt,
    compareArrays,
    httpGet,
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

  function randomInt(min, max) {
    let a = Math.ceil(min);
    let b = Math.floor(max);
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  function compareArrays(first, second) {
    if (!first || !second)
      return false;

    // eslint-disable-next-line 
    if (first.length != second.length) {
      return false;
    }
    for (var i = 0, l = first.length; i < l; i++) {
      if (first[i] instanceof Array && second[i] instanceof Array) {
        if (!compareArrays(first[i], second[i]))
          return false;
      }
      // eslint-disable-next-line 
      else if (first[i] != second[i]) {
        return false;
      }
    }
    return true;
  }

  function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
}
