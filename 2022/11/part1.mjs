import { readFileSync } from "node:fs";

function parseMonkeys(data) {
  return data.split("\n\n").map((x) => {
    const [
      ,
      itemsLine,
      operationLine,
      divisibleByLine,
      trueOutcomeLine,
      falseOutcomeLine,
    ] = x.split("\n").map((y) => y.split(":")[1].trim());

    const items = itemsLine.split(",").map((y) => parseInt(y.trim(), 10));
    const [op, opArg] = operationLine
      .match(/new = old (\*|\+) (old|\d+)/)
      .slice(1);
    const [divisibleBy] = divisibleByLine
      .match(/divisible by (\d+)/)
      .slice(1)
      .map((y) => parseInt(y, 10));
    const [trueOutcome] = trueOutcomeLine
      .match(/throw to monkey (\d+)/)
      .slice(1)
      .map((y) => parseInt(y, 10));
    const [falseOutcome] = falseOutcomeLine
      .match(/throw to monkey (\d+)/)
      .slice(1)
      .map((y) => parseInt(y, 10));

    return {
      items,
      op,
      opArg: opArg !== "old" ? parseInt(opArg, 10) : undefined,
      divisibleBy,
      trueOutcome,
      falseOutcome,
      inspectionCount: 0,
    };
  });
}

function calculateWorryLevel(item, op, opArg) {
  const arg = opArg ?? item;

  switch (op) {
    case "*":
      return item * arg;
    case "+":
      return item + arg;
    default:
      throw new Error(`Unexpected op: ${op}`);
  }
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const monkeys = parseMonkeys(data);

    for (let i = 0; i < 20; i++) {
      monkeys.forEach((m) => {
        m.items.forEach((item) => {
          const updatedItem = Math.floor(
            calculateWorryLevel(item, m.op, m.opArg) / 3
          );

          const monkeyIndex =
            updatedItem % m.divisibleBy === 0 ? m.trueOutcome : m.falseOutcome;
          monkeys[monkeyIndex].items.push(updatedItem);

          m.inspectionCount++;
        });

        m.items = [];
      });
    }

    const inspectionCounts = monkeys
      .map((x) => x.inspectionCount)
      .sort((a, b) => b - a);

    const result = inspectionCounts[0] * inspectionCounts[1];

    console.log(result);

    // CORRECT ANSWER: 90294
  } catch (err) {
    console.error(err);
  }
}

run();
