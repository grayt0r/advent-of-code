import { readFileSync } from "node:fs";

function tail(arr) {
  return arr[arr.length - 1];
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    const xPerCycle = lines.reduce(
      (result, l) => {
        const currentX = tail(result);
        const [instruction, value] = l.split(" ");

        result.push(currentX);

        if (instruction === "addx") {
          result.push(currentX + parseInt(value, 10));
        }

        return result;
      },
      [1]
    );

    const result = [20, 60, 100, 140, 180, 220]
      .map((cycle) => cycle * xPerCycle[cycle - 1])
      .reduce((a, b) => a + b);

    console.log(result);

    // CORRECT ANSWER: 15220
  } catch (err) {
    console.error(err);
  }
}

run();
