import run from "aocrunner";

const parseInput = (rawInput) => {
  const input = rawInput.split("\n");

  // remove first empty line
  if (input[0] === "") {
    input.shift();
  }

  const crates = []; // crates are the input from left to righr in lines
  const stacks = {}; // computated crates per stack
  const instructions = [];

  // copy lines to crates until we find an empty line, then copy the rest to instructions
  let copyToCrates = true;
  input.forEach((line) => {
    if (line.trim() === "") {
      copyToCrates = false;
    } else {
      if (copyToCrates) {
        crates.push(line);
      } else {
        instructions.push(line.trim());
      }
    }
  });

  const cratesFormatted = crates.map((line) => {
    // each line is composed of multiple 3 characters partes connected by a space
    const lineLength = line.length;

    const formattedLine = [];

    for (let i = 0; i < lineLength; i += 4) {
      // get the 3 characters
      const part = line
        // get the 3 characters
        .substr(i, 3)
        // return the middle character
        .split("")[1];
      formattedLine.push(part);
    }

    return formattedLine;
  });

  // generate stacks
  const lastLineFromFormattedCrates = cratesFormatted.pop();
  lastLineFromFormattedCrates.forEach((stack, index) => {
    stacks[stack] = cratesFormatted
      .map((line) => line[index])
      // filter out empty spaces
      .filter((crate) => crate !== " ")
      // reverse the order
      .reverse();
  });

  return {
    stacks,
    instructions,
  };
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const stacks = input.stacks;
  input.instructions.forEach((instruction) => {
    // parse the instruciton line using format "move Z from X to Y"
    const [_, count, from, to] = instruction.match(
      /move (\w+) from (\w) to (\w)/,
    );

    for (let i = 0; i < count; i++) {
      // remove the crate from the stack
      const crate = stacks[from].pop();
      // push the crate to the stack
      stacks[to].push(crate);
    }
  });

  // return last crates from all stacks
  const result = Object.values(stacks)
    .map((stack) => stack.pop())
    .join("");

  return result;
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
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
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
  trimTestInputs: false,
  onlyTests: false,
});
