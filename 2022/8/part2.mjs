import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";

function buildArray(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}

function getHeightsAbove(grid, x, y) {
  return buildArray(0, y)
    .map((y2) => grid[y2][x])
    .reverse();
}

function getHeightsBelow(grid, x, y) {
  return buildArray(y + 1, grid.length).map((y2) => grid[y2][x]);
}

function getHeightsLeft(grid, x, y) {
  return buildArray(0, x)
    .map((x2) => grid[y][x2])
    .reverse();
}

function getHeightsRight(grid, x, y) {
  return buildArray(x + 1, grid[0].length).map((x2) => grid[y][x2]);
}

function calculateMinHeightToEdge(grid, x, y) {
  return Math.min(
    Math.max(...getHeightsAbove(grid, x, y)),
    Math.max(...getHeightsBelow(grid, x, y)),
    Math.max(...getHeightsLeft(grid, x, y)),
    Math.max(...getHeightsRight(grid, x, y))
  );
}

function calculateViewingDistance(currentHeight, heightsInADirection) {
  const index = heightsInADirection.findIndex((h) => h >= currentHeight);
  return index >= 0 ? index + 1 : heightsInADirection.length;
}

function calculateScenicScore(grid, x, y) {
  const height = grid[y][x];

  return (
    calculateViewingDistance(height, getHeightsAbove(grid, x, y)) *
    calculateViewingDistance(height, getHeightsBelow(grid, x, y)) *
    calculateViewingDistance(height, getHeightsLeft(grid, x, y)) *
    calculateViewingDistance(height, getHeightsRight(grid, x, y))
  );
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const grid = data
      .split("\n")
      .map((x) => x.split("").map((y) => parseInt(y, 10)));

    const scenicScores = [];

    for (let y = 1; y + 1 < grid.length; y++) {
      const row = grid[y];

      for (let x = 1; x + 1 < row.length; x++) {
        scenicScores.push(calculateScenicScore(grid, x, y));
      }
    }

    const result = Math.max(...scenicScores);

    console.log(result);

    // CORRECT ANSWER: 211680
  } catch (err) {
    console.error(err);
  }
}

run();
