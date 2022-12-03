import { readFileSync } from "node:fs";

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    function calculatePriority(l) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const isUpperCase = l === l.toUpperCase();
      return letters.indexOf(l.toLowerCase()) + 1 + (isUpperCase ? 26 : 0);
    }

    const groupedLines = [];
    let index = 0;

    while (index < lines.length) {
      groupedLines.push(lines.slice(index, (index += 3)));
    }

    const result = groupedLines
      .map((group) => group.map((elf) => new Set(elf.split(""))))
      .flatMap(([elf1, elf2, elf3]) =>
        [...elf1].filter((item) => elf2.has(item) && elf3.has(item))
      )
      .map((item) => calculatePriority(item))
      .reduce((a, b) => a + b, 0);

    console.log(result);

    // CORRECT ANSWER: 2342
  } catch (err) {
    console.error(err);
  }
}

run();
