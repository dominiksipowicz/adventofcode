import run from "aocrunner";

const parseInput = (rawInput) => {
  // split by new line
  const rucksacks = rawInput.split("\n");

  const trimmedRucksacks = rucksacks.map((rucksack) => rucksack.trim());
  return trimmedRucksacks;
};

// priority dictionary
const priority = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const rucksacksWithComponents = input.map((rucksack) => {
    // split the rucksacks array into two equal size arrays
    const compartment1 = rucksack.slice(0, rucksack.length / 2);
    const compartment2 = rucksack.slice(rucksack.length / 2);

    return { compartment1, compartment2 };
  });

  let sum = 0;

  rucksacksWithComponents.forEach((rucksack) => {
    const { compartment1, compartment2 } = rucksack;

    const compartment1Set = new Set(compartment1);
    const compartment2Set = new Set(compartment2);

    // intersection of two sets
    const intersection = [...compartment1Set].filter((x) =>
      compartment2Set.has(x),
    );
    sum += priority[intersection.pop()];
  });

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;

  for (let i = 0; i < input.length; i = i + 3) {
    const rucksack1 = new Set(input[i]);
    const rucksack2 = new Set(input[i + 1]);
    const rucksack3 = new Set(input[i + 2]);

    // intersection of three sets
    const intersection = [...rucksack1].filter(
      (x) => rucksack2.has(x) && rucksack3.has(x),
    );
    sum += priority[intersection.pop()];
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
