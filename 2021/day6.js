// read file
import fs from "fs";
const testInput = fs.readFileSync("day6-test-input.txt", "utf8");
const mainInput = fs.readFileSync("day6-input.txt", "utf8");

const extractDataFromInput = (input) => {
  return input
    .split("\n")[0]
    .replace("Initial state: ", "") // for test data
    .split(",")
    .map((c) => parseInt(c));
};

const tick = (data) => {
  // new fish two more days for its first cycle. 6 -> 8
  const newFish = data.filter((fish) => fish === 0).map((fish) => 8);

  const dataAfterTick = data.map((fish) => {
    if (fish === 0) {
      // each lanternfish creates a new lanternfish once every 7 days.
      return 6;
    }
    return fish - 1;
  });

  return [...dataAfterTick, ...newFish];
};

const task1 = (input) => {
  let data = extractDataFromInput(input);

  for (let i = 0; i < 80; i++) {
    data = tick(data);
    // console.log("tick " + i + ": " + data.join(", "));
  }
  return data.length;
};

// console.log(task1(testInput));
console.log(task1(mainInput));
