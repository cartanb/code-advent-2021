const input = require('../input');

const incompletes = [];

const syntaxScore = (chunkArray) => {
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
  };
  let result = 0;
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
        if (pairs[char] !== chunkStack.pop()) {
          switch (char) {
            case ')':
              result += 3;
              break;
            case ']':
              result += 57;
              break;
            case '}':
              result += 1197;
              break;
            case '>':
              result += 25137;
              break;
            default:
              break;
          }
          break;
        }
      }
      if (j === chunk.length - 1) {
        incompletes.push(chunk);
      }
    }
  }
  return result;
};

console.log(syntaxScore(input));

module.exports = incompletes;
