// read file
import fs from "fs";
const testInput = fs.readFileSync("day5-test-input.txt", "utf8");
const mainInput = fs.readFileSync("day5-input.txt", "utf8");

const extractDataFromInput = (input) => {
  const data = input.split("\n");
  return data.map((line) =>
    line.split(" -> ").map((cords) => cords.split(",").map((c) => parseInt(c)))
  );
};

const findBiggestCords = (cords) => {
  let maxX = 0;
  let maxY = 0;
  cords.forEach(([x, y]) => {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  return [maxX, maxY];
};

const show = (diagram) => {
  diagram.forEach((row) => {
    console.log(row.map((c) => (c === 0 ? "." : c)).join(""));
  });
};

const tasl1 = (input) => {
  // transform to array, cast to int
  const lines = extractDataFromInput(input);

  // take all cords and find biggest
  const allCords = lines.flat();

  // find bottom corder of the map
  const [maxX, maxY] = findBiggestCords(allCords);

  console.log(`maxX: ${maxX}, maxY: ${maxY}`);

  // create empty diagram
  const diagram = new Array(maxY + 1)
    .fill(0) // rows are 0 for now
    .map(() => new Array(maxX + 1).fill(0)); // columns are 0 for now

  // show(diagram);

  lines.forEach(([start, end]) => {
    // make sure starting point has smaller cords than ending point
    const x1 = start[0] > end[0] ? end[0] : start[0];
    const x2 = start[0] > end[0] ? start[0] : end[0];
    const y1 = start[1] > end[1] ? end[1] : start[1];
    const y2 = start[1] > end[1] ? start[1] : end[1];

    // only consider horizontal and vertical lines
    if (x1 === x2 || y1 === y2) {
      // mark all cords in the line
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          diagram[y][x] += 1;
        }
      }
    }
  });

  // show(diagram);

  const count = diagram.flat().filter((c) => c > 1).length;
  return count;
};

// console.log("Task 1 TEST:", tasl1(testInput));
console.log("Task 1 main:", tasl1(mainInput));
