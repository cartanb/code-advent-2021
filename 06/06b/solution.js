const input = require('../input');

const lanternfish = (fishArray, days) => {
  const fishResult = { };
  for (let fishAges = 9; fishAges > -2; fishAges -= 1) {
    fishResult[fishAges] = 0;
  }

  for (let i = 0; i < fishArray.length; i += 1) {
    const fishAge = fishArray[i];
    fishResult[fishAge] += 1;
  }
  for (let j = 0; j < days; j += 1) {
    for (let fishAgeToDecrement = 0; fishAgeToDecrement < 10; fishAgeToDecrement += 1) {
      fishResult[fishAgeToDecrement - 1] = fishResult[fishAgeToDecrement];
    }
    fishResult[8] += fishResult[-1];
    fishResult[6] += fishResult[-1];
    fishResult[-1] = 0;
  }
  return Object.values(fishResult)
    .reduce((accu, curr) => accu + curr);
};

console.log(lanternfish(input, 256));
