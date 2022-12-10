import { readFileSync } from "node:fs";

function tail(arr) {
  return arr[arr.length - 1];
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    const spritePositionPerCycle = lines.reduce(
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

    const spritePositionPerCycleByRow = Array.from({ length: 6 }, (_, i) =>
      spritePositionPerCycle.slice(i * 40, i * 40 + 40)
    );

    const result = spritePositionPerCycleByRow
      .map((row) =>
        row.map((x, i) => (Math.abs(x - i) <= 1 ? "#" : ".")).join("")
      )
      .join("\n");

    console.log(result);

    // CORRECT ANSWER: RFZEKBFA
  } catch (err) {
    console.error(err);
  }
}

run();
