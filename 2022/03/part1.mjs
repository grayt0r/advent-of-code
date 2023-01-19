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

    const result = lines
      .map(([...items]) => {
        const compartment1 = new Set(items.slice(0, items.length / 2));
        const compartment2 = new Set(items.slice(items.length / 2));
        return [...compartment1].filter((x) => compartment2.has(x));
      })
      .flat()
      .map((item) => calculatePriority(item))
      .reduce((a, b) => a + b, 0);

    console.log(result);

    // CORRECT ANSWER: 8153
  } catch (err) {
    console.error(err);
  }
}

run();
