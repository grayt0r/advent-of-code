import { readFileSync } from "node:fs";

// NOTE: if perf was a problem these helper methods
// could be re-written to avoid creating the intermediate
// arrays and just return the max height instead.
// This brings the timing down from ~40ms to ~18ms.
// Example:
// function getMaxHeightAbove(grid, x, y) {
//   let maxH = 0;

//   for (let i = 0; i < y; i++) {
//     const h = grid[i][x];

//     if (h === 9) {
//       // this is the max height so return early
//       return 9;
//     } else if (h > maxH) {
//       maxH = h;
//     }
//   }

//   return maxH;
// }

function getHeightsAbove(grid, x, y) {
  return grid.slice(0, y).map((col) => col[x]);
}

function getHeightsBelow(grid, x, y) {
  return grid.slice(y + 1).map((col) => col[x]);
}

function getHeightsLeft(grid, x, y) {
  return grid[y].slice(0, x);
}

function getHeightsRight(grid, x, y) {
  return grid[y].slice(x + 1);
}

function calculateMinHeightToEdge(grid, x, y) {
  return Math.min(
    Math.max(...getHeightsAbove(grid, x, y)),
    Math.max(...getHeightsBelow(grid, x, y)),
    Math.max(...getHeightsLeft(grid, x, y)),
    Math.max(...getHeightsRight(grid, x, y))
  );
}

function run() {
  try {
    console.time("part1");

    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const grid = data
      .split("\n")
      .map((x) => x.split("").map((y) => parseInt(y, 10)));

    let interiorTreesVisible = 0;

    for (let y = 1; y + 1 < grid.length; y++) {
      const row = grid[y];

      for (let x = 1; x + 1 < row.length; x++) {
        const height = grid[y][x];
        const minHeightToEdge = calculateMinHeightToEdge(grid, x, y);

        if (height > minHeightToEdge) {
          interiorTreesVisible++;
        }
      }
    }

    const exteriorTreesVisible = grid.length * 2 + (grid[0].length - 2) * 2;

    const result = exteriorTreesVisible + interiorTreesVisible;

    console.log(result);

    // CORRECT ANSWER: 1823

    console.timeEnd("part1");
  } catch (err) {
    console.error(err);
  }
}

run();
