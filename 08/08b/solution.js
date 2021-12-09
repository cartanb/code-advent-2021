const input = require('../input');

const uniqueOutputDigits = (digitSignals) => {
  const result = [];
  for (let i = 0; i < digitSignals.length; i += 1) {
    let [digInput, digOutput] = digitSignals[i].split('|');
    digInput = digInput.split(' ');
    digInput = digInput
      .filter((str) => str.length)
      .sort((a, b) => a.length - b.length);
    const inputMemo = parseInput(digInput);

    digOutput = digOutput.split(' ');
    let outputResult = '';
    for (let j = 0; j < digOutput.length; j += 1) {
      const outputDigit = digOutput[j];
      switch (outputDigit.length) {
        case 2:
          outputResult += '1';
          break;
        case 3:
          outputResult += '7';
          break;
        case 4:
          outputResult += '4';
          break;
        case 5:
          if (anagramCheck(outputDigit, inputMemo[2])) {
            outputResult += '2';
          } else if (anagramCheck(outputDigit, inputMemo[3])) {
            outputResult += '3';
          } else {
            outputResult += '5';
          }
          break;
        case 6:
          if (anagramCheck(outputDigit, inputMemo[0])) {
            outputResult += '0';
          } else if (anagramCheck(outputDigit, inputMemo[6])) {
            outputResult += '6';
          } else {
            outputResult += '9';
          }
          break;
        case 7:
          outputResult += '8';
          break;
        default:
          break;
      }
    }
    result.push(parseInt(outputResult, 10));
  }
  return result.reduce((accu, curr) => accu + curr);

  function parseInput(inputDigits) {
    const memo = {
      0: '',
      1: inputDigits[0],
      2: '',
      3: '',
      4: inputDigits[2],
      5: '',
      6: '',
      7: inputDigits[1],
      8: inputDigits[9],
      9: '',
    };

    const fivesArr = [inputDigits[3], inputDigits[4], inputDigits[5]];
    for (let i = 0; i < fivesArr.length; i += 1) {
      const testStr = fivesArr[i];
      if (lettersInCommon(testStr, memo[1]) === 2) {
        memo[3] = testStr;
        fivesArr.splice(i, 1);
        break;
      }
    }
    memo[2] = lettersInCommon(fivesArr[0], memo[4]) === 2 ? fivesArr[0] : fivesArr[1];
    memo[5] = lettersInCommon(fivesArr[0], memo[4]) === 2 ? fivesArr[1] : fivesArr[0];

    const sixesArr = [inputDigits[6], inputDigits[7], inputDigits[8]];
    for (let i = 0; i < sixesArr.length; i += 1) {
      const testStr = sixesArr[i];
      if (lettersInCommon(testStr, memo[3]) === 5) {
        memo[9] = testStr;
        sixesArr.splice(i, 1);
        break;
      }
    }
    memo[0] = lettersInCommon(sixesArr[0], memo[1]) === 2 ? sixesArr[0] : sixesArr[1];
    memo[6] = lettersInCommon(sixesArr[0], memo[1]) === 2 ? sixesArr[1] : sixesArr[0];

    return memo;
  }

  function anagramCheck(testStr, checkStr) {
    const memo = {};
    for (let i = 0; i < checkStr.length; i += 1) {
      const char = checkStr[i];
      if (!memo[char]) {
        memo[char] = 0;
      }
      memo[char] += 1;
    }
    for (let j = 0; j < testStr.length; j += 1) {
      const char = testStr[j];
      if (!memo[char]) {
        return false;
      }
      memo[char] -= 1;
      if (memo[char] < 0) {
        return false;
      }
    }
    return true;
  }

  function lettersInCommon(testStr, checkStr) {
    const memo = {};
    for (let i = 0; i < checkStr.length; i += 1) {
      const char = checkStr[i];
      if (!memo[char]) {
        memo[char] = 0;
      }
      memo[char] += 1;
    }
    let result = 0;
    for (let j = 0; j < testStr.length; j += 1) {
      const char = testStr[j];
      if (memo[char]) {
        result += 1;
      }
    }
    return result;
  }
};

console.log(uniqueOutputDigits(input));
