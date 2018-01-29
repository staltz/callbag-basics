const fromArray = arr => (t, d) => {
  if (t === 0) {
    d(0, () => {});
    for (let i = 0; i < arr.length; i++) {
      d(1, arr[i]);
    }
    d(2);
  }
}

module.exports = fromArray;
