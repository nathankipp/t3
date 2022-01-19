const sumFn = board => triplet =>
  triplet.reduce((acc, [row, col]) => acc + board[row][col], 0);

const THREES = [
  [[0,0], [1,1], [2,2]],
  [[2,2], [1,1], [0,0]],
];
for (let i = 0; i < 3; i+=1) {
  THREES.push([[i,0], [i,1], [i,2]]); // row
  THREES.push([[0,i], [1,i], [2,i]]); // col
}

export const getWinner = board => {
  let winner;
  const getSum = sumFn(board);
  THREES.forEach(triplet => {
    const sum = getSum(triplet);
    if (!winner) {
      winner = sum === 3
        ? 1
        : sum === -3
        ? -1
        : winner;
    }
  });
  return winner;
}

const SPOT_VALUES = [
  [1,0,1],
  [0,2,0],
  [1,0,1],
];

const winOrBlockFn = board => two => {
  let choice;
  const getSum = sumFn(board);
  THREES.forEach(triplet => {
    const sum = getSum(triplet);
    if (sum === two) {
      choice = triplet.filter(([row, col]) => board[row][col] === 0)[0];
    }
  });
  if (choice) {
    return choice;
  }
}

export const pickSpot = (board) => {
  const winOrBlock = winOrBlockFn(board);
  const win = winOrBlock(-2);
  if (win) {
    return win;
  }
  const block = winOrBlock(2);
  if (block) {
    return block;
  }

  let choice;
  let best = -1;
  board.forEach((row, r) => {
    row.forEach((piece, c) => {
      const spotVal = SPOT_VALUES[r][c];
      if (piece === 0 && spotVal > best) {
        choice = [r,c];
        best = spotVal;
      }
    });
  });
  return choice;
}
