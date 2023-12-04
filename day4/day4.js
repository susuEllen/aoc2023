var input = require("fs").readFileSync("input.txt", "utf8");
//var input = require("fs").readFileSync("inputtest.txt", "utf8");
var scratchCardsDetails = input.split("\n");
var sum = 0;

for (var i = 0; i < scratchCardsDetails.length; i++) {
  cardIndex = getCardIndex(scratchCardsDetails[i]);
  winningNumbers = getWinningNumbers(scratchCardsDetails[i]);
  scratchCardNumbers = getScratchCardNumbers(scratchCardsDetails[i]);
  winningNumberCount = countWinningNumbers(winningNumbers, scratchCardNumbers);
  //console.log(getCardIndex(scratchCardsDetails[i]));
  //   console.log("Winning Numbers: " + getWinningNumbers(scratchCardsDetails[i]));
  //   console.log(
  //     "Scratched Numbers: " + getScratchCardNumbers(scratchCardsDetails[i])
  //   );
  points = winningNumberCount == 0 ? 0 : 2 ** (winningNumberCount - 1);
  sum = sum + points;
  console.log(
    "Number of Winning Numbers: " +
      winningNumberCount +
      " for card " +
      cardIndex +
      " points: " +
      points +
      " sum: " +
      sum
  );
}

function getCardIndex(card) {
  return card.split(":")[0].substring(5);
}

function getWinningNumbers(card) {
  winningNumberString = card.split(":")[1].split("|")[0].trim();
  return winningNumberString.split(" ").map((n) => parseInt(n));
}

function getScratchCardNumbers(card) {
  scratchCardNumberString = card.split(":")[1].split("|")[1].trim();
  scratchCardNumberStringArray = scratchCardNumberString.split(" ");
  scratchCardNumberStringArray = scratchCardNumberStringArray.filter(
    (n) => !isNaN(parseInt(n))
  );
  //console.log(scratchCardNumberStringArray);
  return scratchCardNumberStringArray.map((n) => parseInt(n));
}

function countWinningNumbers(winningNumbers, scratchCardNumbers) {
  var count = 0;
  for (var i = 0; i < scratchCardNumbers.length; i++) {
    if (winningNumbers.includes(scratchCardNumbers[i])) {
      count++;
    }
  }
  return count;
}
