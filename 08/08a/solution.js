const input = require('../input');

const uniqueOutputDigits = (digitSignals) => {
  let result = 0;
  for (let i = 0; i < digitSignals.length; i += 1) {
    let [digInput, digOutput] = digitSignals[i].split('|');
    digOutput = digOutput.split(' ');
    for (let j = 0; j < digOutput.length; j += 1) {
      const outputDigit = digOutput[j];
      if (
        (outputDigit.length > 1 && outputDigit.length < 5) || outputDigit.length === 7
      ) {
        result += 1;
      }
    }
  }
  return result;
};

console.log(uniqueOutputDigits(input));
