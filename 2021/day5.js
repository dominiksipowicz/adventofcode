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

// Get all integer points on a line between two points
const getPointsOnLine = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const points = [];
  if (x1 === x2) {
    if (y1 < y2) {
      for (let y = y1; y <= y2; y++) {
        points.push([x1, y]);
      }
    } else {
      for (let y = y2; y <= y1; y++) {
        points.push([x1, y]);
      }
    }
  } else if (y1 === y2) {
    if (x1 < x2) {
      for (let x = x1; x <= x2; x++) {
        points.push([x, y1]);
      }
    } else {
      for (let x = x2; x <= x1; x++) {
        points.push([x, y1]);
      }
    }
  } else {
    // 45 degree line
    const slope = (y2 - y1) / (x2 - x1);
    const b = y1 - slope * x1;
    if (x1 < x2) {
      for (let x = x1; x <= x2; x++) {
        const y = slope * x + b;
        points.push([x, y]);
      }
    } else {
      for (let x = x2; x <= x1; x++) {
        const y = slope * x + b;
        points.push([x, y]);
      }
    }
  }
  return points;
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

const task2 = (input) => {
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
    // get all points on the lines (horizontal, vertical and 45 degree)
    const points = getPointsOnLine(start, end);

    points.forEach(([x, y]) => {
      diagram[y][x] += 1;
    });
  });

  // show(diagram);

  const count = diagram.flat().filter((c) => c > 1).length;
  return count;
};

// console.log("Task 1 TEST:", tasl1(testInput));
// console.log("Task 1 main:", tasl1(mainInput));

// console.log("Task 2 TEST:", task2(testInput));
console.log("Task 2 main:", task2(mainInput));
