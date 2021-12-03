import input from "./day3-input.js";

const arr = input
  .split("\n") // to array
  .filter((row) => row.length > 0) // remove empty lines
  .map((row) => row.split("").map((char) => parseInt(char))); // string row into int

const reverseBit = (bit) => {
  return bit === 1 ? 0 : 1;
};

const task1 = (arr) => {
  // build a dictionary to count bits occurences
  const gammaRateZero = {};
  const gammaRateOnes = {};

  for (let i = 0; i < arr.length; i++) {
    for (let bitIndex = 0; bitIndex < arr[i].length; bitIndex++) {
      if (arr[i][bitIndex] === 0) {
        if (gammaRateZero[bitIndex]) {
          gammaRateZero[bitIndex] += 1;
        } else {
          gammaRateZero[bitIndex] = 1;
        }
      } else {
        if (gammaRateOnes[bitIndex]) {
          gammaRateOnes[bitIndex] += 1;
        } else {
          gammaRateOnes[bitIndex] = 1;
        }
      }
    }
  }

  let gammaRate = ""; // string to hold the gamma rate

  // check wich occurence is the highest
  for (const [index, zeroBit] of Object.entries(gammaRateZero)) {
    const onesBit = gammaRateOnes[index];
    if (zeroBit > onesBit) {
      gammaRate += `0`;
    } else {
      gammaRate += `1`;
    }
  }

  // cast from string bits to dec int
  const decGammaRate = parseInt(gammaRate, 2);
  console.log(gammaRate);
  console.log(decGammaRate);
  const epsilonRate = gammaRate
    .split("")
    .map((char) => parseInt(char))
    .map((item) => reverseBit(item))
    .join("");
  const decEpsilonRate = parseInt(epsilonRate, 2);
  console.log(epsilonRate);
  console.log(decEpsilonRate);

  return decGammaRate * decEpsilonRate; // decimal
};

console.log(task1(arr));
