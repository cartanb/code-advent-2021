const { numsDrawn, boards } = require('../input');

const giantSquid = (numArray, boardArray) => {
  const memo = {};
  for (let i = 0; i < numArray.length; i += 1) {
    const lastDrawn = numArray[i];
    if (!memo[lastDrawn]) {
      memo[lastDrawn] = true;
    }
    for (let j = 0; j < boardArray.length; j += 1) {
      const thisBoard = boardArray[j];
      if (bingoCheck(thisBoard, lastDrawn)) {
        return unmarkedSum(thisBoard) * lastDrawn;
      }
    }
  }

  function bingoCheck(board, num) {
    const numIdx = board.indexOf(num);
    if (numIdx === -1) {
      return false;
    }

    const row = Math.floor(numIdx / 5);
    const col = numIdx % 5;

    let rowCheck = true;
    let pointer = numIdx;
    while (pointer >= 0 && Math.floor(pointer / 5) === row) {
      const bingoNum = board[pointer];
      if (!memo[bingoNum]) {
        rowCheck = false;
      }
      pointer -= 1;
    }
    pointer = numIdx;
    while (pointer < board.length && Math.floor(pointer / 5) === row) {
      const bingoNum = board[pointer];
      if (!memo[bingoNum]) {
        rowCheck = false;
      }
      pointer += 1;
    }

    let colCheck = true;
    pointer = numIdx;
    while (pointer >= 0 && pointer % 5 === col) {
      const bingoNum = board[pointer];
      if (!memo[bingoNum]) {
        colCheck = false;
      }
      pointer -= 5;
    }
    pointer = numIdx;
    while (pointer < board.length && pointer % 5 === col) {
      const bingoNum = board[pointer];
      if (!memo[bingoNum]) {
        colCheck = false;
      }
      pointer += 5;
    }

    return rowCheck || colCheck;
  }

  function unmarkedSum(board) {
    let result = 0;
    for (let idx = 0; idx < board.length; idx += 1) {
      const bingoNum = board[idx];
      if (!memo[bingoNum]) {
        result += bingoNum;
      }
    }
    return result;
  }
};

console.log(giantSquid(numsDrawn, boards));
