import run from "aocrunner";

const parseInput = (rawInput) => {
  return rawInput.split("\n").map((line) => line.trim().split(""));
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

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
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
        expected: "21",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
