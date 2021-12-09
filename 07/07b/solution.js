const input = require('../input');

const leastFuelForCrabs = (crabArray) => {
  const crabMemo = {};

  for (let i = 0; i < crabArray.length; i += 1) {
    const crabPos = crabArray[i];
    if (!crabMemo[crabPos]) {
      crabMemo[crabPos] = 0;
    }
    crabMemo[crabPos] += 1;
  }

  const crabPositions = Object.keys(crabMemo);
  let tryPosition = Math.floor(crabPositions.length / 2);
  const fuelMemo = {};
  let testFuel = fuelCheck(tryPosition);
  let leftFuel = fuelCheck(tryPosition - 1);
  let rightFuel = fuelCheck(tryPosition + 1);

  if (testFuel < leftFuel && testFuel < rightFuel) {
    return testFuel;
  }
  if (leftFuel < testFuel) {
    while (testFuel > leftFuel) {
      tryPosition -= 1;
      testFuel = fuelCheck(tryPosition);
      leftFuel = fuelCheck(tryPosition - 1);
    }
  } else {
    while (testFuel > rightFuel) {
      tryPosition += 1;
      testFuel = fuelCheck(tryPosition);
      rightFuel = fuelCheck(tryPosition + 1);
    }
  }
  return testFuel;

  function fuelCheck(position) {
    if (fuelMemo[position]) {
      return fuelMemo[position];
    }
    const resultFuel = crabPositions.reduce(
      (accu, crabPos) => accu + totalFuel(Math.abs(position - crabPos)) * crabMemo[crabPos],
      0,
    );
    if (!fuelMemo[position]) {
      fuelMemo[position] = resultFuel;
    }
    return resultFuel;
  }

  function totalFuel(distance) {
    let distPointer = distance;
    let result = 0;
    while (distPointer > 0) {
      result += distPointer;
      distPointer -= 1;
    }
    return result;
  }
};

const testInput = '16,1,2,0,4,2,7,1,2,14';
console.log(leastFuelForCrabs(testInput.split(',').map((num) => parseInt(num, 10))));
console.log(leastFuelForCrabs(input));
