import { readFileSync } from "node:fs";

function isInOrder(left, right) {
  return compare(left, right) < 0;
}

function compare(left, right) {
  const isLeftArray = Array.isArray(left);
  const isRightArray = Array.isArray(right);

  if (isLeftArray && isRightArray) {
    // we're comparing two arrays...

    let result = 0;
    let i = 0;

    while (result === 0) {
      // we're at the end of both arrays so they are considered equal
      if (i === left.length && i === right.length) {
        return 0;
      }

      // the left array is shorter so comes before the right array
      if (i === left.length) {
        return -1;
      }

      // the right array is shorter so comes before the left array
      if (i === right.length) {
        return 1;
      }

      // compare the contents of the arrays
      result = compare(left[i], right[i]);

      i++;
    }

    return result;
  } else if (!isLeftArray && !isRightArray) {
    // we're comparing two integers
    return left - right;
  } else {
    // we're comparing a mixture - convert the non-array to an
    // array and then compare the values
    if (isLeftArray) {
      return compare(left, [right]);
    } else {
      return compare([left], right);
    }
  }
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const pairs = data
      .split("\n\n")
      .map((x) => x.split("\n").map((y) => JSON.parse(y)));

    const divider1 = [[2]];
    const divider2 = [[6]];

    const sortedPackets = pairs
      .flat()
      .concat([divider1, divider2])
      .sort((a, b) => compare(a, b));

    const result =
      (sortedPackets.indexOf(divider1) + 1) *
      (sortedPackets.indexOf(divider2) + 1);

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 140
    // CORRECT ANSWER: 25792
  } catch (err) {
    console.error(err);
  }
}

run();
