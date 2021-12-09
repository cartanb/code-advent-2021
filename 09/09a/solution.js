const input = require('../input');

const lowPointRisk = (pointMatrix) => {
  let result = 0;
  for (let i = 0; i < pointMatrix.length; i += 1) {
    for (let j = 0; j < pointMatrix[i].length; j += 1) {
      let adjacentCheck = true;
      const currentPoint = pointMatrix[i][j];
      if (i > 0 && pointMatrix[i - 1][j] <= currentPoint) {
        adjacentCheck = false;
      }
      if (i < pointMatrix.length - 1 && pointMatrix[i + 1][j] <= currentPoint) {
        adjacentCheck = false;
      }
      if (j > 0 && pointMatrix[i][j - 1] <= currentPoint) {
        adjacentCheck = false;
      }
      if (j < pointMatrix[i].length - 1 && pointMatrix[i][j + 1] <= currentPoint) {
        adjacentCheck = false;
      }

      if (adjacentCheck) {
        result += currentPoint + 1;
      }
    }
  }
  return result;
};

console.log(lowPointRisk(input));
