import { readFileSync } from "node:fs";

function run() {
  try {
    const data = readFileSync("./example.txt", { encoding: "utf8" });
    // const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    const result = lines;

    console.log(result);

    // CORRECT ANSWER: ?
  } catch (err) {
    console.error(err);
  }
}

run();
