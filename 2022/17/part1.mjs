import { readFileSync } from "node:fs";

const MAX_WIDTH = 7;

const shapes = [
  {
    name: "horizontal-line",
    rock: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  },
  {
    name: "plus",
    rock: [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
  },
  {
    name: "reverse-l",
    rock: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  },
  {
    name: "vertical-line",
    rock: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
  {
    name: "square",
    rock: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  },
];

function coordsToKey(x, y) {
  return `${x},${y}`;
}

function calculateNewCoords([cx, cy], [ox, oy], shape, board) {
  const newCoords = shape.rock.map(([rx, ry]) => [cx + rx + ox, cy + ry + oy]);

  if (
    newCoords.some(
      ([x, y]) => board.has(coordsToKey(x, y)) || x < 0 || x >= MAX_WIDTH
    )
  ) {
    return;
  }

  return newCoords;
}

function isMovePossible(coords, offsets, shape, board) {
  return !!calculateNewCoords(coords, offsets, shape, board);
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const blasts = data.split("");
    const board = new Set(
      Array.from({ length: MAX_WIDTH }, (_, i) => [i, 0]).map(([x, y]) =>
        coordsToKey(x, y)
      )
    );

    let highestY = 0;
    let shapeCount = 0;
    let shape;
    let currentCoords;

    const NUM_ROCKS = 2_022;

    for (let tick = 0; shapeCount < NUM_ROCKS; tick++) {
      if (!shape) {
        shape = shapes[shapeCount % shapes.length];
        currentCoords = [2, highestY + 4];
      }

      const blastOffset = blasts[tick % blasts.length] === "<" ? -1 : 1;

      if (isMovePossible(currentCoords, [blastOffset, 0], shape, board)) {
        currentCoords = [currentCoords[0] + blastOffset, currentCoords[1]];
      }

      if (isMovePossible(currentCoords, [0, -1], shape, board)) {
        currentCoords = [currentCoords[0], currentCoords[1] - 1];
      } else {
        calculateNewCoords(currentCoords, [0, 0], shape, board).forEach(
          ([x, y]) => {
            board.add(coordsToKey(x, y));

            highestY = Math.max(highestY, y);
          }
        );

        shapeCount++;
        shape = null;
      }
    }

    const result = highestY;

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 3068
    // CORRECT ANSWER: 3157
  } catch (err) {
    console.error(err);
  }
}

run();
