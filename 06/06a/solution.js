const input = require('../input');

const lanternfish = (fishArray, days) => {
  const fishResult = [...fishArray];
  for (let i = 1; i <= days; i += 1) {
    for (let j = 0; j < fishResult.length; j += 1) {
      fishResult[j] -= 1;
      if (fishResult[j] === -1) {
        fishResult.push(9);
        fishResult[j] = 6;
      }
    }
  }
  return fishResult.length;
};

console.log(lanternfish(input, 80));
