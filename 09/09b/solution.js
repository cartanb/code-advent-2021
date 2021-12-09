const input = require('../input');

const basinCheck = (pointMatrix) => {
  const visitedPoints = pointMatrix
    .map((row) => row.map((point) => false));
  const basins = [];

  for (let i = 0; i < pointMatrix.length; i += 1) {
    for (let j = 0; j < pointMatrix[i].length; j += 1) {
      if (!visitedPoints[i][j]) {
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
          basins.push(visitBasin(i, j));
        }
      }
    }
  }
  basins.sort((a, b) => b - a);
  return basins[0] * basins[1] * basins[2];

  function visitBasin(i, j) {
    let currentSize = 0;
    const pointsToExplore = [[i, j]];

    while (pointsToExplore.length) {
      const current = pointsToExplore.pop();
      const [currX, currY] = current;
      if (!visitedPoints[currX][currY]) {
        visitedPoints[currX][currY] = true;
        if (pointMatrix[currX][currY] < 9) {
          currentSize += 1;
          getUnvisitedNeighbors(currX, currY, pointsToExplore);
        }
      }
    }
    return currentSize;
  }

  function getUnvisitedNeighbors(i, j, pointStack) {
    if (i > 0 && !visitedPoints[i - 1][j]) {
      pointStack.push([i - 1, j]);
    }
    if (i < pointMatrix.length - 1 && !visitedPoints[i + 1][j]) {
      pointStack.push([i + 1, j]);
    }
    if (j > 0 && !visitedPoints[i][j - 1]) {
      pointStack.push([i, j - 1]);
    }
    if (j < pointMatrix[i].length - 1 && !visitedPoints[i][j + 1]) {
      pointStack.push([i, j + 1]);
    }
  }
};

console.log(basinCheck(input));
