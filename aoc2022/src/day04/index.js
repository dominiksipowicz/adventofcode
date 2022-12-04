import run from "aocrunner";

const parseInput = (rawInput) => {
  const input = rawInput
    // split by new line
    .split("\n")
    // clear white spaces around
    .map((line) => line.trim())
    // split by comma
    .map((line) => {
      // O(n)
      return (
        line
          .split(",")
          // clear white spaces around
          .map((subline) => subline.trim())

          // spliut by "-"
          .map((subline) => {
            // O(2)
            const parts = subline.split("-");
            const firstDigit = parseInt(parts[0]);
            const secondDigit = parseInt(parts[1]);
            // O(1)
            // return [firstDigit, secondDigit];

            // O(n)
            // return array of numbers starting from firstDigit and ending with secondDigit
            return Array.from(
              { length: secondDigit - firstDigit + 1 },
              (_, i) => i + firstDigit,
            );
          })
      );
    });

  return input;
};

// does one range fully contain the other range
const doesRangePairFullyContain = (range1, range2) => {
  const set1 = new Set(range1);
  const set2 = new Set(range2);

  // intersection of two sets
  const intersection = new Set([...set1].filter((x) => set2.has(x)));

  // if empty intersection return false
  if (intersection.size === 0) {
    return false;
  }

  if (intersection.size === set1.size || intersection.size === set2.size) {
    return true;
  }

  return false;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput); // O(n^2)

  // count the number of ranges that fully contain another range
  let count = 0;

  input.forEach((section) => {
    // O(n)
    const sectionAssignment1 = section[0];
    const sectionAssignment2 = section[1];

    // is cointained in
    if (doesRangePairFullyContain(sectionAssignment1, sectionAssignment2)) {
      count++;
    }
  });

  return count;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // count the number of ranges that fully contain another range
  let count = 0;

  input.forEach((section) => {
    const set1 = new Set(section[0]);
    const set2 = new Set(section[1]);

    // intersection of two sets
    const intersection = new Set([...set1].filter((x) => set2.has(x)));

    // if overlap is not empty increase count
    if (intersection.size > 0) {
      count++;
    }
  });

  return count;
};

run({
  part1: {
    tests: [
      { input: `2-4,6-8`, expected: 0 },
      { input: `2-3,4-5`, expected: 0 },
      {
        input: `2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
      { input: `3-94,3-96`, expected: 1 },
      { input: `1-10,4-5`, expected: 1 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
