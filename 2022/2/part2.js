const fs = require("fs/promises");

async function run() {
  try {
    const ROCK = "A";
    const PAPER = "B";
    const SCISSORS = "C";

    const OUTCOME_WIN = "Z";
    const OUTCOME_DRAW = "Y";
    const OUTCOME_LOSS = "X";

    const SHAPES = {
      [ROCK]: {
        score: 1,
        winsAgainst: SCISSORS,
        losesTo: PAPER,
      },
      [PAPER]: {
        score: 2,
        winsAgainst: ROCK,
        losesTo: SCISSORS,
      },
      [SCISSORS]: {
        score: 3,
        winsAgainst: PAPER,
        losesTo: ROCK,
      },
    };

    function shapeToPlayForOutcome(opponentShape, outcome) {
      switch (outcome) {
        case OUTCOME_WIN:
          return SHAPES[opponentShape.losesTo];
        case OUTCOME_DRAW:
          return opponentShape;
        case OUTCOME_LOSS:
          return SHAPES[opponentShape.winsAgainst];
      }
    }

    function scoreForOutcome(outcome) {
      switch (outcome) {
        case OUTCOME_WIN:
          return 6;
        case OUTCOME_DRAW:
          return 3;
        case OUTCOME_LOSS:
          return 0;
      }
    }

    // const data = await fs.readFile("./example.txt", { encoding: "utf8" });
    const data = await fs.readFile("./input.txt", { encoding: "utf8" });

    const result = data
      .split("\n")
      .map((shapesStr) => shapesStr.split(" "))
      .reduce((total, [code, outcome]) => {
        const opponentShape = SHAPES[code];
        const ownShape = shapeToPlayForOutcome(opponentShape, outcome);
        return total + ownShape.score + scoreForOutcome(outcome);
      }, 0);

    console.log(result);

    // CORRECT ANSWER: 10116
  } catch (err) {
    console.error(err);
  }
}

run();
