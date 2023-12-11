/*
In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).
 */

// Input: an array of strings, each string is a hand of cards
// Sort the cards
// Categorize them as follows: five of a kind, four of a kind, full house, three of a kind, two pair, one pair, high card
// Sort the categories
// if 2 cards are the same category, compare the first card, then the second, then the third, then the fourth, then the fifth

// Organize the cards how you would playing poker.
// the most

var input = require("fs").readFileSync("input.txt", "utf8");
//var input = require("fs").readFileSync("inputtest.txt", "utf8");
var HandAndBid = input.split("\n");
const handsCount = HandAndBid.length;
console.log("handsCount: " + handsCount);

const fiveOfAKind = [];
const fourOfAKind = [];
const fullHouse = [];
const threeOfAKind = [];
const twoPair = [];
const onePair = [];
const highCard = [];
var handBidMap = new Map();

storeHandsToBidInMap(HandAndBid, handBidMap);
categoriesHandsIntoArray();
sortedHands = highCard
  .sort(compareHandsPart2)
  .concat(
    onePair.sort(compareHandsPart2),
    twoPair.sort(compareHandsPart2),
    threeOfAKind.sort(compareHandsPart2),
    fullHouse.sort(compareHandsPart2),
    fourOfAKind.sort(compareHandsPart2),
    fiveOfAKind.sort(compareHandsPart2)
  );

console.log("sortedfiveOfAKind: " + fiveOfAKind.sort(compareHandsPart2));
console.log("sortedfourOfAKind: " + fourOfAKind.sort(compareHandsPart2));

console.log("sortedHands: " + sortedHands);
console.log(
  "sortedHands.length: " +
    sortedHands.length +
    "\tstarting handsCount: " +
    handsCount
);
var winnings = 0;
console.log("handBidMap: " + handBidMap.size);
for (let i = 0; i < sortedHands.length; i++) {
  var ranking = i + 1;
  winnings = winnings + ranking * handBidMap.get(sortedHands[i].trim());
  console.log(
    "winnings: " +
      winnings +
      "\ti: " +
      i +
      " sortedHands[i] " +
      sortedHands[i] +
      "\tmapped value: " +
      handBidMap.get(sortedHands[i])
  );
}

console.log("winnings: " + winnings);

function storeHandsToBidInMap(handAndBid, handBidMap) {
  for (let i = 0; i < handAndBid.length; i++) {
    let hand = handAndBid[i].trim().split(" ")[0];
    let bid = handAndBid[i].trim().split(" ")[1];
    console.log("hand: " + hand + " bid: " + bid);
    handBidMap.set(hand, bid);
    console.log(
      "handBidMap value when with hand: " +
        hand +
        " value: " +
        handBidMap.get(hand)
    );
  }
}

function categoriesHandsIntoArray() {
  for (let i = 0; i < handsCount; i++) {
    let hand = HandAndBid[i].split(" ")[0];
    let handCategory = categorizeHandPart2(hand);
    switch (handCategory) {
      case "fiveOfAKind":
        fiveOfAKind.push(hand);
        console.log("fiveOfAKind: " + hand);
        break;
      case "fourOfAKind":
        fourOfAKind.push(hand);
        console.log("fourOfAKind: " + hand);
        break;
      case "fullHouse":
        fullHouse.push(hand);
        console.log("fullHouse: " + hand);
        break;
      case "threeOfAKind":
        threeOfAKind.push(hand);
        console.log("threeOfAKind: " + hand);
        break;
      case "twoPair":
        twoPair.push(hand);
        console.log("twoPair: " + hand);
        break;
      case "onePair":
        onePair.push(hand);
        console.log("onePair: " + hand);
        break;
      case "highCard":
        highCard.push(hand);
        console.log("highCard: " + hand);
        break;
      default:
        console.log("Error: hand not categorized: Hand is:" + hand);
    }
  }
}

function countJacksInHand(sortedHand) {
  var numberOfJacks = 0;
  for (let i = 0; i < sortedHand.length; i++) {
    if (sortedHand[i] === "J") {
      numberOfJacks++;
    }
  }
  return numberOfJacks;
}

function categorizeHandPart2(hand) {
  let handArray = new Array(5);
  handArray[0] = hand.slice(0, 1);
  handArray[1] = hand.slice(1, 2);
  handArray[2] = hand.slice(2, 3);
  handArray[3] = hand.slice(3, 4);
  handArray[4] = hand.slice(4, 5);

  sortedHand = handArray.sort();
  var numberOfJacks = countJacksInHand(sortedHand);
  if (numberOfJacks > 0) {
    console.log("numberOfJacks: " + numberOfJacks + " in hand: " + hand);
  }

  //console.log("sortedHand: " + sortedHand);
  let handCategory = "";
  if (
    sortedHand[0] === sortedHand[1] &&
    sortedHand[0] === sortedHand[2] &&
    sortedHand[0] === sortedHand[3] &&
    sortedHand[0] === sortedHand[4]
  ) {
    handCategory = "fiveOfAKind";
  } else if (
    (sortedHand[0] === sortedHand[1] &&
      sortedHand[0] === sortedHand[2] &&
      sortedHand[0] === sortedHand[3]) ||
    (sortedHand[1] === sortedHand[4] &&
      sortedHand[1] === sortedHand[2] &&
      sortedHand[1] === sortedHand[3])
  ) {
    if (numberOfJacks == 1) {
      handCategory = "fiveOfAKind";
      console.log("1 Jack turned handCategory to: " + handCategory);
    } else if (numberOfJacks == 4) {
      handCategory = "fiveOfAKind";
      console.log("2 Jack turned handCategory to: " + handCategory);
    } else {
      handCategory = "fourOfAKind";
    }
  } else if (
    (sortedHand[0] === sortedHand[1] &&
      sortedHand[0] === sortedHand[2] &&
      sortedHand[3] === sortedHand[4]) ||
    (sortedHand[0] === sortedHand[1] &&
      sortedHand[2] === sortedHand[3] &&
      sortedHand[2] === sortedHand[4])
  ) {
    if (numberOfJacks == 2 || numberOfJacks == 3) {
      handCategory = "fiveOfAKind";
      console.log("2 or 1 Jack turned handCategory to: " + handCategory);
    } else {
      handCategory = "fullHouse";
    }
  } else if (
    (sortedHand[0] === sortedHand[1] && sortedHand[0] === sortedHand[2]) ||
    (sortedHand[1] === sortedHand[2] && sortedHand[1] === sortedHand[3]) ||
    (sortedHand[2] === sortedHand[3] && sortedHand[2] === sortedHand[4])
  ) {
    if (numberOfJacks == 1) {
      handCategory = "fourOfAKind";
      console.log("1 Jack turned handCategory to: " + handCategory);
    } else if (numberOfJacks == 2 || numberOfJacks == 3) {
      handCategory = "fiveOfAKind";
      console.log("2 or 1 Jack turned handCategory to: " + handCategory);
    } else {
      handCategory = "threeOfAKind";
    }
  } else if (
    (sortedHand[0] === sortedHand[1] && sortedHand[2] === sortedHand[3]) ||
    (sortedHand[0] === sortedHand[1] && sortedHand[3] === sortedHand[4]) ||
    (sortedHand[1] === sortedHand[2] && sortedHand[3] === sortedHand[4])
  ) {
    if (numberOfJacks == 1) {
      handCategory = "fullHouse";
      console.log("1 Jack turned handCategory to: " + handCategory);
    } else if (numberOfJacks == 2) {
      handCategory = "fourOfAKind";
      console.log("2 Jack turned handCategory to: " + handCategory);
    } else {
      handCategory = "twoPair";
    }
  } else if (
    sortedHand[0] === sortedHand[1] ||
    sortedHand[1] === sortedHand[2] ||
    sortedHand[2] === sortedHand[3] ||
    sortedHand[3] === sortedHand[4]
  ) {
    if (numberOfJacks == 1) {
      handCategory = "threeOfAKind";
      console.log("1 Jack turned handCategory to: " + handCategory);
    } else if (numberOfJacks == 2) {
      handCategory = "threeOfAKind";
      console.log("2 Jack turned handCategory to: " + handCategory);
    } else {
      handCategory = "onePair";
    }
  } else {
    if (numberOfJacks == 1) {
      handCategory = "onePair";
      console.log("1 Jack turned handCategory to: " + handCategory);
    } else {
      handCategory = "highCard";
    }
  }

  return handCategory;
}

function compareHandsPart2(hand1, hand2) {
  var handStrengthOrderArray = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
  ];
  // if hand1 is stronger return 1, if hand2 is stronger return -1, if they are equal return 0
  for (let i = 0; i < hand1.length; i++) {
    if (
      handStrengthOrderArray.indexOf(hand1[i]) >
      handStrengthOrderArray.indexOf(hand2[i])
    ) {
      console.log(
        "hand1[i]: " + hand1[i] + " hand2[i]: " + hand2[i] + "returning 1"
      );
      return 1;
    } else if (
      handStrengthOrderArray.indexOf(hand1[i]) <
      handStrengthOrderArray.indexOf(hand2[i])
    ) {
      console.log(
        "hand1[i]: " + hand1[i] + " hand2[i]: " + hand2[i] + "returning -1"
      );
      return -1;
    }
  }
}
