import { readFileSync } from "node:fs";

function run() {
  try {
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const totalCaloriesPerElf = data.split("\n\n").map((str) =>
      str
        .split("\n")
        .map(Number)
        .reduce((total, num) => total + num, 0)
    );

    const result = Math.max(...totalCaloriesPerElf);

    console.log(result);

    // CORRECT ANSWER: 69501
  } catch (err) {
    console.error(err);
  }
}

run();
