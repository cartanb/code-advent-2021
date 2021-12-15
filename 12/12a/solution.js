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

  // traverseCaves(adj);
};

console.log(findAllPaths(input));
