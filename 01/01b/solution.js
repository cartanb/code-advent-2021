const input = require('../input');

const sonarSweep = (array) => {
  let result = 0;
  for (let idx = 3; idx < array.length; idx += 1) {
    if (slidingWindow(array, idx) > slidingWindow(array, idx - 1)) {
      result += 1;
    }
  }
  return result;

  function slidingWindow(array, idx) {
    return array[idx] + array[idx - 1] + array[idx - 2];
  }
};

console.log(sonarSweep(input));
