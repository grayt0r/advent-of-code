import { readFileSync } from "node:fs";

function run() {
  try {
    const data = readFileSync("./example.txt", { encoding: "utf8" });
    // const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    // TODO: solve!

    const result = lines;

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 1651
    // CORRECT ANSWER: ?
  } catch (err) {
    console.error(err);
  }
}

run();
