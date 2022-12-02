import run from "aocrunner";

const parseInput = (rawInput) => {
  // split by new line
  const input = rawInput.split("\n").map((i) => i.trim());

  // split by space
  const formatted = input.map((line) => line.split(/\s+/));

  return formatted;
};

const points = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
  player: 6,
  draw: 3,
  elf: 0,
};

const part1 = (rawInput) => {
  const dict1 = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
    Y: "Paper",
    X: "Rock",
    Z: "Scissors",
  };

  const whoWon = ([a, b]) => {
    // first is the elf and second is the player
    if (dict1[a] === dict1[b]) return "draw";

    if (a === "A" && b === "Z") return "elf"; // rock beats scissors
    if (a === "B" && b === "X") return "elf"; // paper beats rock
    if (a === "C" && b === "Y") return "elf"; // scissors beats paper

    // otherwise the player wins
    return "player";
  };

  const input = parseInput(rawInput);

  const result = input.reduce((acc, [elf, player]) => {
    const winner = whoWon([elf, player]);

    const pointsFromTheMove = points[dict1[player]];
    let pointsFromTheGameResult = 0;

    if (winner === "player") {
      pointsFromTheGameResult = points.player;
    } else if (winner === "draw") {
      pointsFromTheGameResult = points.draw;
    } else if (winner === "elf") {
      pointsFromTheGameResult = points.elf;
    } else {
      throw new Error("invalid winner");
    }

    // // debug
    // console.log(
    //   "winner",
    //   winner,
    //   [elf, player],
    //   pointsFromTheMove,
    //   pointsFromTheGameResult,
    // );

    // sum up the points
    return acc + pointsFromTheMove + pointsFromTheGameResult;
  }, 0);

  return result;
};

const part2 = (rawInput) => {
  const dict2 = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
    Y: "draw",
    X: "elf", // elf is the winner "X means you need to lose"
    Z: "player", // player is the winner "Z means you need to win"
  };

  const whatIsMyMove = ([elfMove, winner]) => {
    const whoWon = dict2[winner];

    if (whoWon === "draw") {
      return elfMove;
    }

    if (whoWon === "player") {
      if (elfMove === "A") return "B";
      if (elfMove === "B") return "C";
      if (elfMove === "C") return "A";
    } else if (whoWon === "elf") {
      if (elfMove === "A") return "C";
      if (elfMove === "B") return "A";
      if (elfMove === "C") return "B";
    }
  };

  const input = parseInput(rawInput);

  const result = input.reduce((acc, [elf, winner]) => {
    const myMove = whatIsMyMove([elf, winner]);
    const pointsFromTheMove = points[dict2[myMove]];
    const pointsFromTheGameResult = points[dict2[winner]];

    // sum up the points
    return acc + pointsFromTheMove + pointsFromTheGameResult;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
