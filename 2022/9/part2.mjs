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

function tail(arr) {
  return arr[arr.length - 1];
}

function positionToKey(position) {
  return position.join(",");
}

function calculateHeadPosition(position, direction) {
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

function calculateTailPosition(headPosition, tailPosition) {
  const [headX, headY] = headPosition;
  const [tailX, tailY] = tailPosition;

  const diffX = headX - tailX;
  const diffY = headY - tailY;

  // if head and tail are touching then no need to move the tail
  if (Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
    return tailPosition;
  }

  return [tailX + Math.sign(diffX), tailY + Math.sign(diffY)];
}

function run() {
  try {
    console.time("part2");

    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    // const data = readFileSync("./example2.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const instructions = data.split("\n").map((l) => {
      const [d, a] = l.split(" ");
      return [d, parseInt(a, 10)];
    });

    // part1 - 5902
    // let knots = Array(2).fill([0, 0]);
    // part2 - 2445
    let knots = Array(10).fill([0, 0]);

    const allTailPositions = new Set([positionToKey(tail(knots))]);

    instructions.forEach(([direction, amount]) => {
      repeat(amount, () => {
        const [headKnot, ...followingKnots] = knots;
        const updatedKnots = [];

        updatedKnots.push(calculateHeadPosition(headKnot, direction));

        followingKnots.forEach((knot) => {
          updatedKnots.push(calculateTailPosition(tail(updatedKnots), knot));
        });

        allTailPositions.add(positionToKey(tail(updatedKnots)));

        knots = updatedKnots;
      });
    });

    const result = allTailPositions.size;

    console.log(result);

    // CORRECT ANSWER: 2445

    console.timeEnd("part2");
  } catch (err) {
    console.error(err);
  }
}

run();
