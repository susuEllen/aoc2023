// const fs = require("fs");

// const p = "/Users/ellenwong-macpro-13/Documents/ellen_projects/input1.txt";

// const input = fs.readFileSync(p, "utf-8");

// function main() {
//   const lines = input.split("\n");

//   const { total } = lines.reduce(
//     (acc, line, i) => {
//       acc[i] = { first: null, last: null };

//       for (const char of line) {
//         if (!isNaN(Number(char))) {
//           if (!acc[i].first) {
//             acc[i].first = char;
//             acc[i].last = char;
//           } else {
//             acc[i].last = char;
//           }
//         }
//       }
//       console.log(acc[i]);

//       acc.total += !isNaN(Number(`${acc[i].first}${acc[i].last}`))
//         ? Number(`${acc[i].first}${acc[i].last}`)
//         : 0;

//       return acc;
//     },
//     { total: 0 }
//   );

//   console.log(total);
// }

// main();
// read a text file and calculate the sum of the numbers in the file
var input = require("fs").readFileSync("input1.txt", "utf8");
//var input = require("fs").readFileSync("input1test.txt", "utf8");
var lines = input.split("\n");
var sum = 0;
var firstNumber = -1;
var lastNumber = -1;

console.log("number of lines" + lines.length);

for (var j = 0; j < lines.length; j++) {
  word = lines[j];
  console.log(" word: " + word);
  wordValue = -1;
  firstNumber = -1;
  lastNumber = -1;
  var firstNumberFound = false;
  var lastNumberFound = false;
  for (var i = 0; i < word.length && wordValue < 0; i++) {
    firstNumber = firstNumberFound ? firstNumber : parseInt(word[i]);
    lastNumber = lastNumberFound
      ? lastNumber
      : parseInt(word[word.length - i - 1]);
    // console.log("firstNumber: " + firstNumber);
    // console.log("lastNumber: " + lastNumber);
    // console.log("word: " + word);

    if (firstNumber >= 0 && firstNumber < 10) {
      //console.log("firstNumber found" + firstNumber);
      firstNumberFound = true;
    }

    if (lastNumber >= 0 && lastNumber < 10) {
      //console.log("lastNumber found" + lastNumber);
      lastNumberFound = true;
    }

    if (firstNumberFound && lastNumberFound) {
      wordValue = firstNumber.toString() + lastNumber.toString();
      wordValue = parseInt(wordValue);
      sum = sum + wordValue;
      console.log("wordValue: " + wordValue + "\tword: " + word);
      console.log("sum: " + sum);
    }
  }
  if (!firstNumberFound || !lastNumberFound) {
    console.log(
      "ERROR: firstNumberFound: " +
        firstNumberFound +
        "\tlastNumberFound: " +
        lastNumberFound +
        "\tword: " +
        word
    );
  }
}

console.log(sum);
