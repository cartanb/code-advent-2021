const { template, rules } = require('../input');

const polymerization = (template, rules, days) => {
  const rulesProducts = {};
  const rulesCount = {};
  for (let i = 0; i < rules.length; i += 1) {
    const [pair, toAdd] = rules[i].split(' -> ');
    rulesProducts[pair] = toAdd;
    rulesCount[pair] = 0;
  }

  const charCount = {};
  for (let i = 0; i < template.length; i += 1) {
    const pair = template[i] + template[i + 1];
    if (rulesProducts[pair]) {
      rulesCount[pair] += 1;
    }
    if (!charCount[template[i]]) {
      charCount[template[i]] = 0;
    }
    charCount[template[i]] += 1;
  }

  const rulesLoop = Object.keys(rulesCount);
  for (let day = 1; day <= days; day += 1) {
    const newPairs = {};
    for (let j = 0; j < rulesLoop.length; j += 1) {
      const pair = rulesLoop[j];
      if (rulesCount[pair]) {
        if (!charCount[rulesProducts[pair]]) {
          charCount[rulesProducts[pair]] = 0;
        }
        charCount[rulesProducts[pair]] += rulesCount[pair];
        const newPairLeft = pair[0] + rulesProducts[pair];
        const newPairRight = rulesProducts[pair] + pair[1];
        if (!newPairs[newPairLeft]) {
          newPairs[newPairLeft] = 0;
        }
        newPairs[newPairLeft] += rulesCount[pair];
        if (!newPairs[newPairRight]) {
          newPairs[newPairRight] = 0;
        }
        newPairs[newPairRight] += rulesCount[pair];
        rulesCount[pair] = 0;
      }
    }
    const newPairsArr = Object.keys(newPairs);
    for (let newPairIdx = 0; newPairIdx < newPairsArr.length; newPairIdx += 1) {
      const newPair = newPairsArr[newPairIdx];
      if (rulesProducts[newPair]) {
        rulesCount[newPair] += newPairs[newPair];
      }
    }
  }

  const polymerCounts = Object.values(charCount);
  return Math.max(...polymerCounts) - Math.min(...polymerCounts);
};

console.log(polymerization(template, rules, 40));
