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

function calculateNewCoords([cx, cy], [ox, oy], shape, board) {
  const newCoords = shape.rock.map(([rx, ry]) => [cx + rx + ox, cy + ry + oy]);

  if (newCoords.some(([x, y]) => x < 0 || x >= MAX_WIDTH || board[x][y])) {
    return;
  }

  return newCoords;
}

function isMovePossible(coords, offsets, shape, board) {
  return !!calculateNewCoords(coords, offsets, shape, board);
}

function generateState(shapeIndex, blastIndex, highestY, board) {
  const endY = Math.max(highestY - 100, 0);

  let state = `${shapeIndex}|${blastIndex}|`;

  for (let i = highestY; i > endY; i--) {
    for (let j = 0; j < MAX_WIDTH; j++) {
      state += board[j][i] ? "#" : ".";
    }
  }

  return state;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    console.time("time");

    const blasts = data.split("");
    const board = Array.from({ length: MAX_WIDTH }, () => [true]);

    let highestY = 0;
    let shapeCount = 0;
    let shape;
    let currentCoords;
    let tick;

    let pastStates = new Map();
    let result;

    const NUM_ROCKS = 1_000_000_000_000;

    for (tick = 0; shapeCount < NUM_ROCKS; tick++) {
      if (!shape) {
        const shapeIndex = shapeCount % shapes.length;

        shape = shapes[shapeIndex];
        currentCoords = [2, highestY + 4];

        const state = generateState(
          shapeIndex,
          tick % blasts.length,
          highestY,
          board
        );

        const matchingState = pastStates.get(state);

        // if we have found a repeating pattern then we can calculate the result
        if (matchingState) {
          const totalRepeatingRocks = NUM_ROCKS - matchingState.shapeCount;
          const shapeCountDiff = shapeCount - matchingState.shapeCount;
          const highestYDiff = highestY - matchingState.highestY;

          const repeatCount = totalRepeatingRocks / shapeCountDiff;
          const remainder = totalRepeatingRocks % shapeCountDiff;

          if (remainder === 0) {
            result = matchingState.highestY + highestYDiff * repeatCount;
            break;
          }
        } else {
          // otherwise save the state so we can check it later
          pastStates.set(state, { tick, highestY, shapeCount });
        }
      }

      const blastOffset = blasts[tick % blasts.length] === "<" ? -1 : 1;

      // attempt to move horizontally for blast
      if (isMovePossible(currentCoords, [blastOffset, 0], shape, board)) {
        currentCoords = [currentCoords[0] + blastOffset, currentCoords[1]];
      }

      // attempt to move down
      if (isMovePossible(currentCoords, [0, -1], shape, board)) {
        currentCoords = [currentCoords[0], currentCoords[1] - 1];
      } else {
        calculateNewCoords(currentCoords, [0, 0], shape, board).forEach(
          ([x, y]) => {
            board[x][y] = true;

            highestY = Math.max(highestY, y);
          }
        );

        shapeCount++;
        shape = null;
      }
    }

    console.timeEnd("time");

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 1514285714288
    // CORRECT ANSWER: 1581449275319
  } catch (err) {
    console.error(err);
  }
}

run();
