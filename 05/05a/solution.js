const input = require('../input');

const ventCheck = (lineArr) => {
  const memo = {};
  for (let i = 0; i < lineArr.length; i += 1) {
    let [startCoord, endCoord] = lineArr[i];
    startCoord = startCoord
      .split(',')
      .map((coordNum) => parseInt(coordNum, 10));
    endCoord = endCoord
      .split(',')
      .map((coordNum) => parseInt(coordNum, 10));
    if (startCoord[0] === endCoord[0]) {
      if (startCoord[1] < endCoord[1]) {
        for (let j = startCoord[1]; j <= endCoord[1]; j += 1) {
          const coord = `${startCoord[0]},${j}`;
          if (!memo[coord]) {
            memo[coord] = 0;
          }
          memo[coord] += 1;
        }
      } else {
        for (let j = startCoord[1]; j >= endCoord[1]; j -= 1) {
          const coord = `${startCoord[0]},${j}`;
          if (!memo[coord]) {
            memo[coord] = 0;
          }
          memo[coord] += 1;
        }
      }
    } else if (startCoord[1] === endCoord[1]) {
      if (startCoord[0] < endCoord[0]) {
        for (let j = startCoord[0]; j <= endCoord[0]; j += 1) {
          const coord = `${j},${startCoord[1]}`;
          if (!memo[coord]) {
            memo[coord] = 0;
          }
          memo[coord] += 1;
        }
      } else {
        for (let j = startCoord[0]; j >= endCoord[0]; j -= 1) {
          const coord = `${j},${startCoord[1]}`;
          if (!memo[coord]) {
            memo[coord] = 0;
          }
          memo[coord] += 1;
        }
      }
    }
  }
  let result = 0;
  const memoPoints = Object.values(memo);
  for (let idx = 0; idx < memoPoints.length; idx += 1) {
    if (memoPoints[idx] > 1) {
      result += 1;
    }
  }
  return result;
};

console.log(ventCheck(input));
