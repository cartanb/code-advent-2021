const input = require('../10a/solution');

const autofillScore = (chunkArray) => {
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  };
  const results = [];

  for (let i = 0; i < chunkArray.length; i += 1) {
    const chunk = chunkArray[i];
    const chunkStack = [];

    for (let j = 0; j < chunk.length; j += 1) {
      const char = chunk[j];
      const chunkStarts = /[([{<]/;
      const chunkEnds = /[)\]}>]/;
      if (chunkStarts.test(char)) {
        chunkStack.push(char);
      }
      if (chunkEnds.test(char)) {
        chunkStack.pop();
      }
    }

    let autofill = '';
    let result = 0;
    while (chunkStack.length) {
      const current = chunkStack.pop();
      autofill += pairs[current];
    }

    for (let k = 0; k < autofill.length; k += 1) {
      result *= 5;

      const char = autofill[k];
      switch (char) {
        case ')':
          result += 1;
          break;
        case ']':
          result += 2;
          break;
        case '}':
          result += 3;
          break;
        case '>':
          result += 4;
          break;
        default:
          break;
      }
    }
    results.push(result);
  }

  const mid = Math.floor(results.length / 2);
  results.sort((a, b) => a - b);
  return results[mid];
};

console.log(autofillScore(input));
