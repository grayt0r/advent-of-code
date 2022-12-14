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
            result.add(coordToKey([j, k]));
          }
        }
      }

      return result;
    }, new Set());
}

function coordToKey(coord) {
  return coord.join(",");
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const filledCoords = parseInput(data);
    const SAND_START = [500, 0];

    // TODO: improve
    const allY = [...filledCoords].map((x) => parseInt(x.split(",")[1], 10));
    const maxY = Math.max(...allY);

    let sandCount = 0;

    console.time("part1");

    while (true) {
      let position = SAND_START;

      while (true) {
        const [x, y] = position;
        const below = [x, y + 1];
        const belowLeft = [x - 1, y + 1];
        const belowRight = [x + 1, y + 1];

        if (y >= maxY) {
          position = null;
          break;
        } else if (!filledCoords.has(coordToKey(below))) {
          position = below;
        } else if (!filledCoords.has(coordToKey(belowLeft))) {
          position = belowLeft;
        } else if (!filledCoords.has(coordToKey(belowRight))) {
          position = belowRight;
        } else {
          break;
        }
      }

      if (position) {
        filledCoords.add(coordToKey(position));
        sandCount++;
      } else {
        break;
      }
    }

    console.timeEnd("part1");

    console.log(sandCount);

    // CORRECT ANSWER: 873
  } catch (err) {
    console.error(err);
  }
}

run();
