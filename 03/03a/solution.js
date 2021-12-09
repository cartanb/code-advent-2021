const input = require('../input');

const binaryDiagnostic = (binaryArr) => {
  const memo = [];
  for (let i = 0; i < binaryArr.length; i += 1) {
    const binaryStr = binaryArr[i];
    for (let j = 0; j < binaryStr.length; j += 1) {
      if (!memo[j]) {
        memo[j] = [0, 0];
      }
      if (binaryStr[j] === '0') {
        memo[j][0] += 1;
      } else {
        memo[j][1] += 1;
      }
    }
  }

  let gammaResult = '';
  let epsResult = '';
  for (let binDigit = 0; binDigit < memo.length; binDigit += 1) {
    const binPair = memo[binDigit];
    gammaResult += Math.max(binPair[0], binPair[1]) === binPair[0] ? '0' : '1';
    epsResult += Math.min(binPair[0], binPair[1]) === binPair[0] ? '0' : '1';
  }

  return parseInt(gammaResult, 2) * parseInt(epsResult, 2);
};

console.log(binaryDiagnostic(input));
