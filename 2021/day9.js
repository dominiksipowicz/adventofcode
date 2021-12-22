import { input as testInput } from "./day9-test-input.js";
import { input as mainInput } from "./day9-input.js";

// covert strings to arrays of numbers
const transformInput = (input) => {
  const lines = input.split("\n").filter((line) => line.length > 0);
  return lines.map((line) => line.split("").map((char) => parseInt(char)));
};

const task1 = (input) => {
  const heightmap = transformInput(input);
  const width = heightmap[0].length;
  const height = heightmap.length;
  // find low points in the heightmap
  const lowPoints = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const current = heightmap[y][x];
      const top = y > 0 ? heightmap[y - 1][x] : null;
      const bottom = y < height - 1 ? heightmap[y + 1][x] : null;
      const left = x > 0 ? heightmap[y][x - 1] : null;
      const right = x < width - 1 ? heightmap[y][x + 1] : null;
      if (
        (current < top || top === null) &&
        (current < bottom || bottom === null) &&
        (current < left || left === null) &&
        (current < right || right === null)
      ) {
        lowPoints.push({ x, y, value: current });
      }
    }
  }

  const riskLevels = lowPoints.map((point) => {
    const { x, y, value } = point;
    return 1 + value;
  });

  // sum up the risk levels
  return riskLevels.reduce((acc, curr) => acc + curr, 0);
};

// console.log(task1(testInput));
console.log(task1(mainInput));
