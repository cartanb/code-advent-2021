const fs = require('fs');
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
  });
};

let newDots = [...dots];
for (let i = 0; i < folds.length; i += 1) {
  const [axis, foldNum] = folds[i].split('=');
  newDots = origami(newDots, axis, parseInt(foldNum, 10));
}

let finalLength = 0;
let finalHeight = 0;
for (let j = 0; j < newDots.length; j += 1) {
  const [xCoord, yCoord] = newDots[j]
    .split(',')
    .map((num) => parseInt(num, 10));
  if (xCoord > finalLength) {
    finalLength = xCoord + 1;
  }
  if (yCoord > finalHeight) {
    finalHeight = yCoord + 1;
  }
}
let result = new Array(finalHeight).fill(new Array(finalLength).fill(0));
let resultString = JSON.stringify(result.map((row, rowIdx) => row.map((_el, colIdx) => (
  newDots.includes(`${colIdx},${rowIdx}`) ? '#' : '.'
))));
fs.writeFile('./13b/finalOrigami.json', resultString, 'utf8', () => console.log('origami complete!'));
