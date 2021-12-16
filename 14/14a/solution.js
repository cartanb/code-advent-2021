const { template, rules } = require('../input');

const polymerization = (template, rules, days) => {
  const rulesMemo = {};
  for (let i = 0; i < rules.length; i += 1) {
    const [pair, toAdd] = rules[i].split(' -> ');
    rulesMemo[pair] = toAdd;
  }

  let newPolymer = template;
  for (let day = 1; day <= days; day += 1) {
    let result = '';
    for (let j = 0; j < newPolymer.length; j += 1) {
      const pair = newPolymer[j] + newPolymer[j + 1];
      if (rulesMemo[pair]) {
        result += newPolymer[j] + rulesMemo[pair];
      } else {
        result += newPolymer[j];
      }
    }
    newPolymer = result;
  }

  const polymerMemo = {};
  for (let k = 0; k < newPolymer.length; k += 1) {
    const char = newPolymer[k];
    if (!polymerMemo[char]) {
      polymerMemo[char] = 0;
    }
    polymerMemo[char] += 1;
  }

  const polymerCounts = Object.values(polymerMemo);
  return Math.max(...polymerCounts) - Math.min(...polymerCounts);
};

console.log(polymerization(template, rules, 10));
