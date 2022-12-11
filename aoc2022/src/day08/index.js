import run from "aocrunner";

const parseInput = (rawInput) => {
  return rawInput.split("\n").map((line) =>
    line
      .trim()
      .split("")
      .map((number) => parseInt(number, 10)),
  );
};

const isVisible = (grid, x, y) => {
  // if on edge return true
  if (x === 0 || x === grid.length - 1 || y === 0 || y === grid[0].length - 1) {
    return true;
  }

  // check for the visibility in 4 directions
  // if all numbers in any direction are less than the current number, return true
  if (grid[x].slice(y + 1).every((n) => n < grid[x][y])) {
    return true;
  }
  if (grid[x].slice(0, y).every((n) => n < grid[x][y])) {
    return true;
  }
  if (grid.slice(x + 1).every((row) => row[y] < grid[x][y])) {
    return true;
  }
  if (grid.slice(0, x).every((row) => row[y] < grid[x][y])) {
    return true;
  }

  return false;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (isVisible(input, i, j)) {
        sum++;
      }
    }
  }
  return sum;
};

const getScenicScore = (grid, x, y) => {
  // early return if on edge
  if (x == 0 || y == 0 || x == grid.length - 1 || y == grid[0].length - 1) {
    return 0;
  }

  const viewingDistance = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
  };

  // up direction
  for (let i = y; i > 0; i--) {
    viewingDistance.up += 1;

    const treeHeight = grid[y][x];
    const currentAboveTreeHeight = grid[i - 1][x];

    if (currentAboveTreeHeight >= treeHeight) {
      // the tree is higher than the current tree, so we can't see past it
      break;
    }
  }

  // down direction
  for (let i = y; i < grid.length - 1; i++) {
    viewingDistance.down += 1;

    const treeHeight = grid[y][x];
    const currentBelowTreeHeight = grid[i + 1][x];

    if (currentBelowTreeHeight >= treeHeight) {
      // the tree is higher than the current tree, so we can't see past it
      break;
    }
  }

  // left direction
  for (let i = x; i > 0; i--) {
    viewingDistance.left += 1;

    const treeHeight = grid[y][x];
    const currentLeftTreeHeight = grid[y][i - 1];

    if (currentLeftTreeHeight >= treeHeight) {
      // the tree is higher than the current tree, so we can't see past it
      break;
    }
  }

  // right direction
  for (let i = x; i < grid[0].length - 1; i++) {
    viewingDistance.right += 1;

    const treeHeight = grid[y][x];
    const currentRightTreeHeight = grid[y][i + 1];

    if (currentRightTreeHeight >= treeHeight) {
      // the tree is higher than the current tree, so we can't see past it
      break;
    }
  }

  // A tree's scenic score is found by multiplying together its viewing distance in each of the four directions.
  return (
    viewingDistance.up *
    viewingDistance.down *
    viewingDistance.left *
    viewingDistance.right
  );
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const score = getScenicScore(input, x, y);
      grid[y] = grid[y] || [];
      grid[y][x] = score;
    }
  }

  // find the max score in the matrix
  let maxScore = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] > maxScore) {
        maxScore = grid[y][x];
      }
    }
  }
  return maxScore;
};

run({
  part1: {
    tests: [
      {
        input: `
30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
