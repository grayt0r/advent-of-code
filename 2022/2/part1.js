const fs = require("fs/promises");

async function run() {
  try {
    const ROCK = 1;
    const PAPER = 2;
    const SCISSORS = 3;

    const WIN = 6;
    const DRAW = 3;
    const LOSS = 0;

    function scoreForShape(shape) {
      switch (shape) {
        case "A":
        case "X":
          return ROCK;
        case "B":
        case "Y":
          return PAPER;
        case "C":
        case "Z":
          return SCISSORS;
        default:
          throw new Error(`Unexpected shape: ${shape}`);
      }
    }

    function scoreForOutcome(opponentShape, ownShape) {
      const scoreForOpponentShape = scoreForShape(opponentShape);
      const scoreForOwnShape = scoreForShape(ownShape);

      if (
        (scoreForOwnShape === ROCK && scoreForOpponentShape === SCISSORS) ||
        (scoreForOwnShape === SCISSORS && scoreForOpponentShape === PAPER) ||
        (scoreForOwnShape === PAPER && scoreForOpponentShape === ROCK)
      ) {
        return WIN;
      }

      if (scoreForOwnShape === scoreForOpponentShape) {
        return DRAW;
      }

      return LOSS;
    }

    // const data = await fs.readFile("./example.txt", { encoding: "utf8" });
    const data = await fs.readFile("./input.txt", { encoding: "utf8" });

    const result = data
      .split("\n")
      .map((shapesStr) => shapesStr.split(" "))
      .reduce((total, [s1, s2]) => {
        return total + scoreForShape(s2) + scoreForOutcome(s1, s2);
      }, 0);

    console.log(result);

    // CORRECT ANSWER: 8392
  } catch (err) {
    console.error(err);
  }
}

run();
