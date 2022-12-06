import { readFileSync } from "node:fs";

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    const MARKER_SIZE = 4;

    const result = lines.map((x) => {
      const chars = x.split("");

      for (let i = 0; i + MARKER_SIZE < chars.length; i++) {
        const s = new Set(chars.slice(i, i + MARKER_SIZE));

        if (s.size === MARKER_SIZE) {
          return i + MARKER_SIZE;
        }
      }
    });

    console.log(result);

    // CORRECT EXAMPLE ANSWERS: 7, 5, 6, 10, 11
    // CORRECT ANSWER: 1987
  } catch (err) {
    console.error(err);
  }
}

run();
