import { readFileSync } from "node:fs";

function run() {
  try {
    const ROCK = "A";
    const PAPER = "B";
    const SCISSORS = "C";

    const WIN = "Z";
    const DRAW = "Y";
    const LOSS = "X";

    const SCORE_FOR_SHAPE = {
      [ROCK]: 1,
      [PAPER]: 2,
      [SCISSORS]: 3,
    };

    const SCORE_FOR_OUTCOME = {
      [WIN]: 6,
      [DRAW]: 3,
      [LOSS]: 0,
    };

    const SHAPE_FOR_OUTCOME = {
      [ROCK]: {
        [WIN]: PAPER,
        [DRAW]: ROCK,
        [LOSS]: SCISSORS,
      },
      [PAPER]: {
        [WIN]: SCISSORS,
        [DRAW]: PAPER,
        [LOSS]: ROCK,
      },
      [SCISSORS]: {
        [WIN]: ROCK,
        [DRAW]: SCISSORS,
        [LOSS]: PAPER,
      },
    };

    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const result = data
      .split("\n")
      .map((str) => str.split(" "))
      .reduce((total, [opponentShape, outcome]) => {
        const ownShape = SHAPE_FOR_OUTCOME[opponentShape][outcome];
        return total + SCORE_FOR_SHAPE[ownShape] + SCORE_FOR_OUTCOME[outcome];
      }, 0);

    console.log(result);

    // CORRECT ANSWER: 10116
  } catch (err) {
    console.error(err);
  }
}

run();
