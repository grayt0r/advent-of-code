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

    // ALTERNATIVE: can create the set directly from a sub string
    // const result = lines.map((x) => {
    //   for (let i = 0; i + MARKER_SIZE < x.length; i++) {
    //     const s = new Set(x.substring(i, i + MARKER_SIZE));

    //     if (s.size === MARKER_SIZE) {
    //       return i + MARKER_SIZE;
    //     }
    //   }
    // });

    // ALTERNATIVE
    // const result = lines.map((x) => {
    //   let chars = [];

    //   for (let i = 0; i < x.length; i++) {
    //     const c = x[i];
    //     const existingIndex = chars.indexOf(c);

    //     if (existingIndex >= 0) {
    //       chars = chars.slice(existingIndex + 1);
    //     }

    //     chars.push(c);

    //     if (chars.length === MARKER_SIZE) {
    //       return i + 1;
    //     }
    //   }
    // });

    console.log(result);

    // CORRECT EXAMPLE ANSWERS: 7, 5, 6, 10, 11
    // CORRECT ANSWER: 1987
  } catch (err) {
    console.error(err);
  }
}

run();
