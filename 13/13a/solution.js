const { dots, folds } = require('../input');

const origami = (dotArr, axis, foldNum) => {
  const newDots = [...dotArr];
  for (let i = 0; i < newDots.length; i += 1) {
    const [xCoord, yCoord] = newDots[i]
      .split(',')
      .map((num) => parseInt(num, 10));
    if (axis === 'x') {
      if (xCoord > foldNum) {
        newDots[i] = `${foldNum - (xCoord - foldNum)},${yCoord}`;
      }
    } else if (yCoord > foldNum) {
      newDots[i] = `${xCoord},${foldNum - (yCoord - foldNum)}`;
    }
  }
  const memo = {};
  return newDots.filter((dotCoords) => {
    if (!memo[dotCoords]) {
      memo[dotCoords] = 0;
    }
    memo[dotCoords] += 1;
    return memo[dotCoords] === 1;
  }).length;
};

const [axis, foldNum] = folds[0].split('=');
console.log(origami(dots, axis, parseInt(foldNum, 10)));
