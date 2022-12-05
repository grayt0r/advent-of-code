import { readFileSync } from "node:fs";

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const [stacksRaw, proceduresRaw] = data
      .split("\n\n")
      .map((x) => x.split("\n"));

    // Assume there will be at least one row of items
    const stackCount = (stacksRaw[0].length + 1) / 4;

    const stacks = Array.from({ length: stackCount }, (x, i) =>
      stacksRaw
        .slice(0, -1)
        .map((y) => y[1 + i * 4].trim())
        .filter(Boolean)
        .reverse()
    );

    const procedures = proceduresRaw.map((x) =>
      x
        .match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
        .slice(1)
        .map((y) => parseInt(y, 10))
    );

    // Run the procedures
    procedures.forEach(([count, fromStackIndex, toStackIndex]) => {
      for (let i = 0; i < count; i++) {
        const item = stacks[fromStackIndex - 1].pop();
        stacks[toStackIndex - 1].push(item);
      }
    });

    const result = stacks.map((x) => x[x.length - 1]).join("");

    console.log(result);

    // CORRECT ANSWER: TLFGBZHCN
  } catch (err) {
    console.error(err);
  }
}

run();
