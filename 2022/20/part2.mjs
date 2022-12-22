import { readFileSync } from "node:fs";

function mod(a, n) {
  return ((a % n) + n) % n;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    console.time("time");

    const numbers = data.split("\n").map((x) => parseInt(x, 10) * 811589153);
    const indices = Array.from({ length: numbers.length }, (_, i) => i);

    const loop = Array.from(
      { length: numbers.length * 10 },
      (_, i) => i % numbers.length
    );

    loop.forEach((i) => {
      const j = indices.indexOf(i);
      indices.splice(j, 1);
      indices.splice(mod(j + numbers[i], indices.length), 0, i);
    });

    const zeroPosition = indices.indexOf(numbers.indexOf(0));

    const result = [1000, 2000, 3000]
      .map((n) => numbers[indices[mod(zeroPosition + n, numbers.length)]])
      .reduce((a, b) => a + b, 0);

    console.timeEnd("time");

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 1623178306
    // CORRECT ANSWER: 2488332343098
  } catch (err) {
    console.error(err);
  }
}

run();
