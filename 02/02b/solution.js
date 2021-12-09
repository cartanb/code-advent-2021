const input = require('../input');

const dive = (cmdArray) => {
  const result = [0, 0, 0];
  for (let idx = 0; idx < cmdArray.length; idx += 1) {
    const cmd = cmdArray[idx];
    switch (cmd[0]) {
      case 'forward':
        result[0] += cmd[1];
        result[1] += cmd[1] * result[2];
        break;
      case 'down':
        result[2] += cmd[1];
        break;
      case 'up':
        result[2] -= cmd[1];
        break;
      default:
        break;
    }
  }
  return result[0] * result[1];
};

console.log(dive(input));
