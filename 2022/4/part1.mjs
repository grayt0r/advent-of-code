import { readFileSync } from "node:fs";

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    function buildAssignmentsAsSet(start, end) {
      return new Set(
        Array.from({ length: end - start + 1 }, (v, i) => i + start)
      );
    }

    function isFullyContained(s1, s2) {
      const intersection = [...s1].filter((z) => s2.has(z));
      return intersection.length === s1.size || intersection.length === s2.size;
    }

    const result = lines
      .map((l) =>
        l
          .split(",")
          .map((x) => x.split("-").map((y) => parseInt(y, 10)))
          .map(([a, b]) => buildAssignmentsAsSet(a, b))
      )
      .filter(([a, b]) => isFullyContained(a, b)).length;

    console.log(result);

    // CORRECT ANSWER: 584
  } catch (err) {
    console.error(err);
  }
}

run();
