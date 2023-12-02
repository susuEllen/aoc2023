/*
Cubes are either red, green, or blue.

Determine which games would have been possible 
if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. 
What is the sum of the IDs of those games?

For example:
For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, three sets of cubes are revealed from the bag (and then put back again).
The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; 
the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag contained only
***** 12 red cubes, 13 green cubes, and 14 blue cubes ***?

Games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration.
However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, 
game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. 
If you add up the IDs of the games that would have been possible, you get 8.
*/
var input = require("fs").readFileSync("input.txt", "utf8");
//var input = require("fs").readFileSync("inputtest.txt", "utf8");
var games = input.split("\n");

// grab game ID
// grab number of cubes
// compare max number of cubes to number of cubes in game

function getGameId(game) {
  return game.split(":")[0].substring(5);
}

/*
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
*/
function getRedGreenBlueCubeCount(game) {
  revealedCubes = game.split(":")[1].split("; ");
  var numberOfRedCubes = 0;
  var numberOfGreenCubes = 0;
  var numberOfBlueCubes = 0;
  for (var i = 0; i < revealedCubes.length; i++) {
    var cubes = revealedCubes[i].split(", ");
    //console.log(cubes);

    for (var j = 0; j < cubes.length; j++) {
      var cubeCount = 0;
      //console.log("cubes[J]" + cubes[j]);
      cubeString = cubes[j].toString().trim();
      if (cubeString.includes("red")) {
        //console.log("red is found. cubeString: " + cubeString);
        cubeCount = parseInt(cubes[j].trim().split(" ")[0]);
        numberOfRedCubes =
          cubeCount > numberOfRedCubes ? cubeCount : numberOfRedCubes;
      } else if (cubeString.includes("green")) {
        //console.log("green is found. cubeString: " + cubeString);
        cubeCount = parseInt(cubes[j].trim().split(" ")[0]);
        numberOfGreenCubes =
          cubeCount > numberOfGreenCubes ? cubeCount : numberOfGreenCubes;
      } else if (cubeString.includes("blue")) {
        cubeCount = parseInt(cubes[j].trim().split(" ")[0]);
        numberOfBlueCubes =
          cubeCount > numberOfBlueCubes ? cubeCount : numberOfBlueCubes;
        // console.log(
        //   "blue is found. cubeString: " +
        //     cubeString +
        //     "\t cubeCount: " +
        //     cubeCount +
        //     "\t numberOfBlueCubes: " +
        //     numberOfBlueCubes
        // );
      }
    }
    // console.log(
    //   "numberOfRedCubes: " +
    //     numberOfRedCubes +
    //     "\t numberOfGreenCubes: " +
    //     numberOfGreenCubes +
    //     "\t numberOfBlueCubes: " +
    //     numberOfBlueCubes
    // );
  }
  console.log(
    "numberOfRedCubes: " +
      numberOfRedCubes +
      "\t numberOfGreenCubes: " +
      numberOfGreenCubes +
      "\t numberOfBlueCubes: " +
      numberOfBlueCubes
  );
  console.log(revealedCubes);
  return {
    red: numberOfRedCubes,
    green: numberOfGreenCubes,
    blue: numberOfBlueCubes,
  };
}
var sumOfGameIds = 0;
for (var i = 0; i < games.length; i++) {
  console.log(getGameId(games[i]));
  //console.log(getRedGreenBlueCubeCount(games[i]));

  cubeCountForGame = getRedGreenBlueCubeCount(games[i]);
  if (
    cubeCountForGame.red <= 12 &&
    cubeCountForGame.green <= 13 &&
    cubeCountForGame.blue <= 14
  ) {
    console.log("game " + getGameId(games[i]) + " is possible");
    sumOfGameIds += parseInt(getGameId(games[i]));
  } else {
    console.log("game " + getGameId(games[i]) + " is NOT possible");
  }
  console.log("sumOfGameIds: " + sumOfGameIds);
}
