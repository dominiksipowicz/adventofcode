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
  const epsilonRate = gammaRate
    .split("")
    .map((char) => parseInt(char))
    .map((item) => reverseBit(item))
    .join("");
  const decEpsilonRate = parseInt(epsilonRate, 2);

  return decGammaRate * decEpsilonRate; // decimal
};

const task2 = (arr) => {
  const checkMostCommonBit = (arr, position) => {
    const bitCount = {
      zero: 0,
      one: 0,
    };
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][position] === 0) {
        bitCount.zero += 1;
      } else {
        bitCount.one += 1;
      }
    }
    return bitCount;
  };

  // how long to run the loop
  const numberOBits = arr[0].length;

  // === oxygen generator rating part

  // If 0 and 1 are equally common, keep values with a 1 in the position being considered
  const oxygenGeneratorRatingBitCondition = (bitCount) => {
    return bitCount.one >= bitCount.zero ? 1 : 0;
  };

  let newArr = arr; // working copy of the array
  for (let i = 0; i < numberOBits; i++) {
    const bitCount = checkMostCommonBit(newArr, i);
    // remove all rows that don't have the most common bit
    newArr = newArr.filter(
      (row) => row[i] === oxygenGeneratorRatingBitCondition(bitCount)
    );
  }
  const oxygenGeneratorRating = newArr.flat().join(""); // formatting
  const decOxygenGeneratorRating = parseInt(oxygenGeneratorRating, 2);

  // === CO2 scrubber rating

  // To find CO2 scrubber rating, determine the least common value
  // If 0 and 1 are equally common, keep values with a 0 in the position being considered.
  const CO2scrubberRatingBitCondition = (bitCount) => {
    return bitCount.one >= bitCount.zero ? 0 : 1;
  };

  newArr = arr; // reset working copy of the array
  for (let i = 0; i < numberOBits; i++) {
    const bitCount = checkMostCommonBit(newArr, i);
    // remove all rows that don't have the most common bit
    newArr = newArr.filter(
      (row) => row[i] === CO2scrubberRatingBitCondition(bitCount)
    );
    if (newArr.length === 1) {
      break;
    }
  }

  const CO2scrubberRating = newArr.flat().join(""); // formatting
  const decCO2scrubberRating = parseInt(CO2scrubberRating, 2);

  // final result
  return decOxygenGeneratorRating * decCO2scrubberRating;
};

// console.log(task1(arr));
console.log(task2(arr));
