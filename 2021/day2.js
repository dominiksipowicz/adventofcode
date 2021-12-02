import input from "./day2-input.js";

const calculateResult = (arr) => {
  let depth = 0;
  let horizontal = 0;

  arr.forEach((row) => {
    const command = row.split(" ");
    const direction = command[0];
    const distance = parseInt(command[1]);

    switch (direction) {
      case "forward":
        horizontal += distance;
        break;
      case "up":
        depth -= distance;
        break;
      case "down":
        depth += distance;
        break;
    }
  });
  return horizontal * depth;
};

console.log(calculateResult(input));
