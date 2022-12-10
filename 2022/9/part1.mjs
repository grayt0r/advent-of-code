import { readFileSync } from "node:fs";

const UP = "U";
const DOWN = "D";
const LEFT = "L";
const RIGHT = "R";

function repeat(count, f) {
  Array(count)
    .fill()
    .forEach(() => f());
}

function positionToKey(position) {
  return position.join(",");
}

function calculateNewPosition(position, direction) {
  const [x, y] = position;

  switch (direction) {
    case UP:
      return [x, y + 1];
    case DOWN:
      return [x, y - 1];
    case LEFT:
      return [x - 1, y];
    case RIGHT:
      return [x + 1, y];
  }
}

function calculateTailMoves(headPosition, tailPosition) {
  const [headX, headY] = headPosition;
  const [tailX, tailY] = tailPosition;

  const diffX = headX - tailX;
  const diffY = headY - tailY;

  // if head and tail are touching then no need to move the tail
  if (Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
    return [];
  }

  switch (positionToKey([diffX, diffY])) {
    // if head and tail are two spaces apart in a single direction
    // then move the tail one space in that direction
    case "0,2":
      return [UP];
    case "0,-2":
      return [DOWN];
    case "2,0":
      return [RIGHT];
    case "-2,0":
      return [LEFT];
    // otherwise move the tail one space diagonally to keep up
    case "1,2":
    case "2,1":
      return [UP, RIGHT];
    case "1,-2":
    case "2,-1":
      return [DOWN, RIGHT];
    case "-1,2":
    case "-2,1":
      return [UP, LEFT];
    case "-1,-2":
    case "-2,-1":
      return [DOWN, LEFT];
    default:
      throw new Error(`Unexpected tail move: ${diffX}, ${diffY}`);
  }
}

function run() {
  try {
    console.time("part1");

    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const instructions = data.split("\n").map((l) => {
      const [d, a] = l.split(" ");
      return [d, parseInt(a, 10)];
    });

    let headPosition = [0, 0];
    let tailPosition = [0, 0];

    const allHeadPositions = new Set([positionToKey(headPosition)]);
    const allTailPositions = new Set([positionToKey(tailPosition)]);

    instructions.forEach(([direction, amount]) => {
      repeat(amount, () => {
        headPosition = calculateNewPosition(headPosition, direction);

        allHeadPositions.add(positionToKey(headPosition));

        calculateTailMoves(headPosition, tailPosition).forEach((d) => {
          tailPosition = calculateNewPosition(tailPosition, d);
        });

        allTailPositions.add(positionToKey(tailPosition));
      });
    });

    const result = allTailPositions.size;

    console.log(result);

    // CORRECT ANSWER: 5902

    console.timeEnd("part1");
  } catch (err) {
    console.error(err);
  }
}

run();
