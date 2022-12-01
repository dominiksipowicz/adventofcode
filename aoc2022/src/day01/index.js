import run from "aocrunner";

const parseInput = (rawInput) => {
  rawInput;
  const groups = rawInput.split(/\n/);

  const elfs = [];

  let count = 0;
  for (const group of groups) {
    if (!elfs[count]) {
      const newElf = {
        totalCalories: 0,
        foodCals: [],
      };
      elfs[count] = newElf;
    }

    if (group.trim() === "") {
      count++;
    } else {
      elfs[count].foodCals.push(parseInt(group.trim()));
    }
  }

  return elfs;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  // sum up food calories (foodCals) into totalCalories
  for (const elf of input) {
    elf.totalCalories = elf.foodCals.reduce((a, b) => a + b, 0);
  }
  // console.log(input);

  // return the the elf with max totalCalories
  const result = input.reduce((a, b) =>
    a.totalCalories > b.totalCalories ? a : b,
  );

  return result.totalCalories;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // sum up food calories (foodCals) into totalCalories
  for (const elf of input) {
    elf.totalCalories = elf.foodCals.reduce((a, b) => a + b, 0);
  }

  // sort the elfs array by totalCalories
  input.sort((a, b) => a.totalCalories - b.totalCalories);

  const sumOfLest3 =
    input.pop().totalCalories +
    input.pop().totalCalories +
    input.pop().totalCalories;

  return sumOfLest3;
};

run({
  part1: {
    tests: [
      {
        input: `1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
        2000
        3000
        
        4000
        
        5000
        6000
        
        7000
        8000
        9000
        
        10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
