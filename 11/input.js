const input = `2238518614
4552388553
2562121143
2666685337
7575518784
3572534871
8411718283
7742668385
1235133231
2546165345`;

module.exports = input
  .split('\n')
  .map((row) => row.split('').map((num) => parseInt(num, 10)));
