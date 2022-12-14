import { readFileSync } from "node:fs";

function parseInput(data) {
  return data
    .split("\n")
    .map((x) =>
      x.split(" -> ").map((y) => y.split(",").map((z) => parseInt(z, 10)))
    )
    .reduce((result, line) => {
      for (let i = 0; i + 1 < line.length; i++) {
        const [x1, y1] = line[i];
        const [x2, y2] = line[i + 1];
        const [startX, endX] = [x1, x2].sort((a, b) => a - b);
        const [startY, endY] = [y1, y2].sort((a, b) => a - b);

        for (let j = startX; j <= endX; j++) {
          for (let k = startY; k <= endY; k++) {
            result.add(coordToKey(j, k));
          }
        }
      }

      return result;
    }, new Set());
}

function coordToKey(x, y) {
  return x * 1000 + y;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const filledCoords = parseInput(data);
    const SAND_START = [500, 0];

    // TODO: improve
    const allY = [...filledCoords].map((x) => x % 1000);
    const maxY = Math.max(...allY) + 2;

    let sandCount = 0;

    console.time("part1");

    while (true) {
      let [x, y] = SAND_START;

      while (true) {
        if (y + 1 >= maxY) {
          break;
        } else if (!filledCoords.has(coordToKey(x, y + 1))) {
          y++;
        } else if (!filledCoords.has(coordToKey(x - 1, y + 1))) {
          x--;
          y++;
        } else if (!filledCoords.has(coordToKey(x + 1, y + 1))) {
          x++;
          y++;
        } else {
          break;
        }
      }

      filledCoords.add(coordToKey(x, y));
      sandCount++;

      if (x === 500 && y === 0) {
        break;
      }
    }

    console.timeEnd("part1");

    console.log(sandCount);

    // CORRECT ANSWER: 24813
  } catch (err) {
    console.error(err);
  }
}

run();
