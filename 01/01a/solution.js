const input = require('../input');

const sonarSweep = (array) => {
  let result = 0;
  for (let idx = 1; idx < array.length; idx += 1) {
    if (array[idx] > array[idx - 1]) {
      result += 1;
    }
  }
  return result;
};

console.log(sonarSweep(input));
