const input = require('../input');

const findAllPaths = (pathArr) => {
  let result = 0;
  const adj = {};
  for (let i = 0; i < pathArr.length; i += 1) {
    const [caveOne, caveTwo] = pathArr[i].split('-');
    if (!adj[caveOne]) {
      adj[caveOne] = [];
    }
    if (!adj[caveTwo]) {
      adj[caveTwo] = [];
    }
    if (!adj[caveOne].includes(caveTwo)) {
      adj[caveOne].push(caveTwo);
    }
    if (!adj[caveTwo].includes(caveOne)) {
      adj[caveTwo].push(caveOne);
    }
  }

  traverseCaves('start', adj);
  return result;

  function traverseCaves(currentCave, caveGraph, cavesVisited = []) {
    if (currentCave === 'end') {
      result += 1;
      return;
    }

    const stack = [];
    for (let i = 0; i < caveGraph[currentCave].length; i += 1) {
      const nextCave = caveGraph[currentCave][i];
      const capsCheck = /[A-Z]+/;
      if (
        (noRepeatedSmallCaves([...cavesVisited, currentCave])
          || !cavesVisited.includes(nextCave)
          || capsCheck.test(nextCave))
        && nextCave !== 'start'
      ) {
        stack.push(nextCave);
      }
    }
    while (stack.length) {
      const nextCave = stack.pop();
      traverseCaves(nextCave, caveGraph, [...cavesVisited, currentCave]);
    }
  }

  function noRepeatedSmallCaves(cavesArr) {
    const memo = {};
    const lowersCheck = /[a-z]+/;
    for (let i = 0; i < cavesArr.length; i += 1) {
      const cave = cavesArr[i];
      if (memo[cave] && lowersCheck.test(cave)) {
        return false;
      }
      if (!memo[cave]) {
        memo[cave] = true;
      }
    }
    return true;
  }
};

console.log(findAllPaths(input));
