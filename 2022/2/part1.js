const fs = require("fs/promises");

async function run() {
  try {
    const ROCK = "A";
    const PAPER = "B";
    const SCISSORS = "C";

    const WIN = 6;
    const DRAW = 3;
    const LOSS = 0;

    const NORMALIZE_INPUT = {
      X: "A",
      Y: "B",
      Z: "C",
    };

    const SCORE_FOR_SHAPE = {
      [ROCK]: 1,
      [PAPER]: 2,
      [SCISSORS]: 3,
    };

    const CALCULATE_OUTCOME = {
      [ROCK]: {
        [ROCK]: DRAW,
        [PAPER]: WIN,
        [SCISSORS]: LOSS,
      },
      [PAPER]: {
        [ROCK]: LOSS,
        [PAPER]: DRAW,
        [SCISSORS]: WIN,
      },
      [SCISSORS]: {
        [ROCK]: WIN,
        [PAPER]: LOSS,
        [SCISSORS]: DRAW,
      },
    };

    // const data = await fs.readFile("./example.txt", { encoding: "utf8" });
    const data = await fs.readFile("./input.txt", { encoding: "utf8" });

    const result = data
      .split("\n")
      .map((str) => str.split(" "))
      .reduce((total, [opponentShape, ownShape]) => {
        const normalizedOwnShape = NORMALIZE_INPUT[ownShape];
        return (
          total +
          SCORE_FOR_SHAPE[normalizedOwnShape] +
          CALCULATE_OUTCOME[opponentShape][normalizedOwnShape]
        );
      }, 0);

    console.log(result);

    // CORRECT ANSWER: 8392
  } catch (err) {
    console.error(err);
  }
}

run();
