const input = require('../input');

const binaryDiagnostic = (binaryArr) => {
  let oxyArr = [...binaryArr];
  let bitOffset = 0;
  while (oxyArr.length > 1) {
    let count0 = 0;
    let count1 = 0;
    const zeroArr = [];
    const oneArr = [];

    for (let idx = 0; idx < oxyArr.length; idx += 1) {
      const binaryStr = oxyArr[idx];
      const bit = binaryStr[bitOffset];
      if (bit === '0') {
        count0 += 1;
        zeroArr.push(binaryStr);
      } else {
        count1 += 1;
        oneArr.push(binaryStr);
      }
    }

    if (count0 > count1) {
      oxyArr = zeroArr;
    } else {
      oxyArr = oneArr;
    }
    bitOffset += 1;
  }
  const oxygenRating = oxyArr[0];

  let scrubArr = [...binaryArr];
  bitOffset = 0;
  while (scrubArr.length > 1) {
    let count0 = 0;
    let count1 = 0;
    const zeroArr = [];
    const oneArr = [];

    for (let idx = 0; idx < scrubArr.length; idx += 1) {
      const binaryStr = scrubArr[idx];
      const bit = binaryStr[bitOffset];
      if (bit === '0') {
        count0 += 1;
        zeroArr.push(binaryStr);
      } else {
        count1 += 1;
        oneArr.push(binaryStr);
      }
    }

    if (count1 < count0) {
      scrubArr = oneArr;
    } else {
      scrubArr = zeroArr;
    }
    bitOffset += 1;
  }
  const scrubRating = scrubArr[0];

  return parseInt(oxygenRating, 2) * parseInt(scrubRating, 2);
};

console.log(binaryDiagnostic(input));
