const input = require('../input');

const octoFlash = (octoArr, days) => {
  let result = 0;
  const workArr = octoArr.map((row) => row.map((num) => num));
  for (let day = 1; day <= days; day += 1) {
    const hasFlashed = octoArr.map((row) => row.map((_el) => false));
    for (let i = 0; i < octoArr.length; i += 1) {
      for (let j = 0; j < octoArr[0].length; j += 1) {
        workArr[i][j] += 1;
      }
    }
    for (let i = 0; i < octoArr.length; i += 1) {
      for (let j = 0; j < octoArr[0].length; j += 1) {
        if (workArr[i][j] > 9) {
          flash(i, j, hasFlashed);
        }
      }
    }
  }
  return result;

  function flash(i, j, hasFlashed) {
    const pointsToExplore = [[i, j]];
    while (pointsToExplore.length) {
      const current = pointsToExplore.pop();
      const [currI, currJ] = current;
      if (!hasFlashed[currI][currJ]) {
        if (workArr[currI][currJ] > 9) {
          hasFlashed[currI][currJ] = true;
          result += 1;
          incrementNeighbors(currI, currJ, pointsToExplore, hasFlashed);
          workArr[currI][currJ] = 0;
        }
      }
    }
  }

  function incrementNeighbors(i, j, pointStack, hasFlashed) {
    if (i > 0 && !hasFlashed[i - 1][j]) {
      workArr[i - 1][j] += 1;
      pointStack.push([i - 1, j]);
    }
    if (i < workArr.length - 1 && !hasFlashed[i + 1][j]) {
      workArr[i + 1][j] += 1;
      pointStack.push([i + 1, j]);
    }
    if (j > 0 && !hasFlashed[i][j - 1]) {
      workArr[i][j - 1] += 1;
      pointStack.push([i, j - 1]);
    }
    if (j < workArr[i].length - 1 && !hasFlashed[i][j + 1]) {
      workArr[i][j + 1] += 1;
      pointStack.push([i, j + 1]);
    }
    if ((i > 0 && j > 0) && !hasFlashed[i - 1][j - 1]) {
      workArr[i - 1][j - 1] += 1;
      pointStack.push([i - 1, j - 1]);
    }
    if ((i > 0 && j < workArr[i].length - 1) && !hasFlashed[i - 1][j + 1]) {
      workArr[i - 1][j + 1] += 1;
      pointStack.push([i - 1, j + 1]);
    }
    if ((i < workArr.length - 1 && j > 0) && !hasFlashed[i + 1][j - 1]) {
      workArr[i + 1][j - 1] += 1;
      pointStack.push([i + 1, j - 1]);
    }
    if ((i < workArr.length - 1 && j < workArr[i].length - 1) && !hasFlashed[i + 1][j + 1]) {
      workArr[i + 1][j + 1] += 1;
      pointStack.push([i + 1, j + 1]);
    }
  }
};

console.log(octoFlash(input, 100));
