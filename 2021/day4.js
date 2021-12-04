// read file
import fs from "fs";
const testInput = fs.readFileSync("day4-test-input.txt", "utf8");
const mainInput = fs.readFileSync("day4-input.txt", "utf8");

const extractDataFromInput = (input) => {
  const data = input.split("\n\n");
  const numbers = data.shift().split(",");
  const boards = data.map((board) => {
    const rows = board.split("\n");
    return rows.map((row) =>
      row
        .split(" ")
        .filter((x) => x !== "")
        .map((stringNumber) => ({
          value: parseInt(stringNumber),
          marked: false,
        }))
    );
  });
  return {
    numbers,
    boards,
  };
};

const task1 = (input) => {
  const data = extractDataFromInput(input);

  const sumNotSelected = (boardIndex) => {
    let sum = 0;
    data.boards[boardIndex].forEach((row) => {
      row.forEach((cell) => {
        if (!cell.marked) {
          sum += cell.value;
        }
      });
    });
    return sum;
  };

  const checkForBingo = (board) => {
    // check board for bingo (horizontal and vertical)
    let bingo = false;
    for (let i = 0; i < 5; i++) {
      const row = board[i];
      const col = board.map((row) => row[i]);
      if (
        row.every((cell) => cell.marked) ||
        col.every((cell) => cell.marked)
      ) {
        bingo = true;
        break;
      }
    }
    return bingo;
  };

  const markBoard = (boardIndex, number) => {
    // mark numbers in board
    data.boards[boardIndex].forEach((_, row) => {
      data.boards[boardIndex][row].forEach((cell, index) => {
        if (cell.value === parseInt(number)) {
          data.boards[boardIndex][row][index].marked = true;
        }
      });
    });

    // check board for bingo win
    const board = data.boards[boardIndex];
    const bingo = checkForBingo(board);
    if (bingo) {
      return { win: true, boardIndex, number, sum: sumNotSelected(boardIndex) };
    }
    return { win: false };
  };

  // for each drawed number check for bingo on each board
  const winners = [];
  data.numbers.forEach((number) => {
    if (winners.length && winners[0].win) {
      // break if we already have a winner
      return;
    }
    data.boards.forEach((_, index) => {
      const bingoStatus = markBoard(index, number);
      if (bingoStatus.win === true) {
        winners.push(bingoStatus);
      }
    });
  });

  console.log(winners);
  const winner = winners[0];
  return parseInt(winner.number) * winner.sum;
};

// console.log("test: ", task1(testInput));
console.log("main: ", task1(mainInput));
