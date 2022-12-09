import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const length = input.length;

  for (let i = 3; i < length; i++) {
    const a = input[i - 3];
    const b = input[i - 2];
    const c = input[i - 1];
    const d = input[i];

    // return true if all 4 are different
    if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
      return i + 1;
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const length = input.length;

  const distinctChars = 14;

  for (let i = distinctChars; i < length; i++) {
    // create substring from i - [distinctChars] to i
    const subString = input.substring(i - distinctChars, i);

    // remove duplicates
    const set = new Set(subString.split(""));
    if (set.size == distinctChars) {
      return i;
    }
  }

  return;
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
