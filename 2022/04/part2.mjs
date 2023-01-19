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

    function isOverlap(s1, s2) {
      const intersection = [...s1].filter((z) => s2.has(z));
      return intersection.length > 0;
    }

    const result = lines
      .map((l) =>
        l
          .split(",")
          .map((x) => x.split("-").map((y) => parseInt(y, 10)))
          .map(([a, b]) => buildAssignmentsAsSet(a, b))
      )
      .filter(([a, b]) => isOverlap(a, b)).length;

    // ALTERNATIVE: avoids some work / need for helper methods
    // const result = lines
    //   .map((l) =>
    //     l.split(",").map((x) => x.split("-").map((y) => parseInt(y, 10)))
    //   )
    //   .filter(
    //     ([[start1, end1], [start2, end2]]) => start2 <= end1 && end2 >= start1
    //   ).length;

    console.log(result);

    // CORRECT ANSWER: 933
  } catch (err) {
    console.error(err);
  }
}

run();
