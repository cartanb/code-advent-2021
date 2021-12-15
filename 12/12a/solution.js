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
      if (!cavesVisited.includes(nextCave) || capsCheck.test(nextCave)) {
        stack.push(nextCave);
      }
    }
    while (stack.length) {
      const nextCave = stack.pop();
      traverseCaves(nextCave, caveGraph, [...cavesVisited, currentCave]);
    }
  }
};

console.log(findAllPaths(input));
