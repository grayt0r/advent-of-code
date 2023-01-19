import { readFileSync } from "node:fs";

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const lines = data.split("\n");

    const MARKER_SIZE = 14;

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

    // CORRECT EXAMPLE ANSWERS: 19, 23, 23, 29, 26
    // CORRECT ANSWER: 3059
  } catch (err) {
    console.error(err);
  }
}

run();
