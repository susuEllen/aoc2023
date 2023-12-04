/*
an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..


Find the sum of all of the part numbers in the engine schematic?
Every other number is adjacent to a symbol and so is a part number;
their sum is 4361.

*/

var input = require("fs").readFileSync("input.txt", "utf8");
//var input = require("fs").readFileSync("inputtest.txt", "utf8");
var schematicRow = input.split("\n");
var numberOfRows = schematicRow.length;
var numberOfColumns = schematicRow[0].length;
let symbolLocationArray = Array(numberOfRows)
  .fill()
  .map(() => Array(numberOfColumns).fill(false)); // initialize 2d array of booleans
console.log(symbolLocationArray);

// find all symbols in the schematic
// store position of symbol in 2d array of booleans: true if symbol, false if not (i.e. number or a dot)

// for each row, scan and store the number, then use symbol array to check if number has adjacent symbol
// if so, add to sum
// To check if adjacent symbol exist, scan all adjacent cells for a true value in the symbol array
populateSymbolLocationArray();

sumOfPartNumbers();

function sumOfPartNumbers() {
  // sum all the numbers
  var sum = 0;
  var currentNumber = "";
  for (var i = 0; i < schematicRow.length; i++) {
    for (var j = 0; j < schematicRow[i].length; j++) {
      if (!isNaN(parseInt(schematicRow[i][j]))) {
        console.log(
          "number found: " + schematicRow[i][j] + " at " + i + "," + j
        );
        currentNumber = currentNumber + schematicRow[i][j];
        if (j === schematicRow[i].length - 1) {
          //console.log("currentNumber: " + currentNumber);
          if (isNextToSymbol(i, j - currentNumber.length + 1, j)) {
            console.log("currentNumber isNextToSymbol: " + currentNumber);
            sum = sum + parseInt(currentNumber);
          } else {
            console.log("currentNumber is NOT NextToSymbol: " + currentNumber);
          }
          currentNumber = "";
        }
      } else {
        if (currentNumber.length != "") {
          //console.log("currentNumber: " + currentNumber);
          if (isNextToSymbol(i, j - currentNumber.length, j - 1)) {
            console.log("currentNumber isNextToSymbol: " + currentNumber);
            sum = sum + parseInt(currentNumber);
          } else {
            console.log("currentNumber is NOT NextToSymbol: " + currentNumber);
          }
          currentNumber = "";
        }
      }
    }
  }
  console.log("sum: " + sum);
  console.log("currentNumber: " + currentNumber);
}

function populateSymbolLocationArray() {
  for (var i = 0; i < schematicRow.length; i++) {
    for (var j = 0; j < schematicRow[i].length; j++) {
      if (
        isNaN(parseInt(schematicRow[i][j])) &&
        !schematicRow[i][j].includes(".")
      ) {
        //console.log("symbol found: " + schematicRow[i][j] + " at " + i + "," + j);
        symbolLocationArray[i][j] = true;
      }
      //console.log(schematicRow[i]);
    }
  }
  console.log(symbolLocationArray);
}

function isNextToSymbol(currentRow, startingColumn, endingColumn) {
  //TODO: handle edge cases: min, max row and column
  // check the rectangle of cells around the number
  for (
    var i = Math.max(0, currentRow - 1);
    i <= Math.min(numberOfRows - 1, currentRow + 1);
    i++
  ) {
    for (
      var j = Math.max(0, startingColumn - 1);
      j <= Math.min(numberOfColumns - 1, endingColumn + 1);
      j++
    ) {
      console.log(
        "i: " +
          i +
          " j: " +
          j +
          " symbolLocationArray[i][j]: " +
          symbolLocationArray[i][j]
      );
      if (symbolLocationArray[i][j] === true) {
        return true;
      }
    }
  }
  return false;
}
