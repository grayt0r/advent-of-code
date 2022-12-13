import { readFileSync } from "node:fs";

function parseInput(data) {
  let start;
  let end;

  const grid = data.split("\n").map((l, y) => {
    return l.split("").map((c, x) => {
      if (c === "S") {
        start = [x, y];
      }
      if (c === "E") {
        end = [x, y];
      }

      return getElevation(c);
    });
  });

  return [start, end, grid];
}

function getElevation(value) {
  if (value === "S") {
    return 0;
  }

  if (value === "E") {
    return 25;
  }

  return "abcdefghijklmnopqrstuvwxyz".indexOf(value);
}

const COORD_OFFSETS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

// TODO: improve perf
function getNeighbours([x, y], grid) {
  const height = grid.length;
  const width = grid[0].length;

  const currentElevation = grid[y][x];
  let result = [];

  COORD_OFFSETS.forEach(([xOffset, yOffset]) => {
    const newX = x + xOffset;
    const newY = y + yOffset;

    if (0 <= newX && newX < width && 0 <= newY && newY < height) {
      const possibleElevation = grid[newY][newX];

      // part1 -> part2
      // if (possibleElevation <= currentElevation + 1) {
      if (possibleElevation >= currentElevation - 1) {
        result.push([newX, newY]);
      }
    }
  });

  return result;
}

function coordsToKey(coords) {
  return coords.join(",");
}

function keyToCoords(key) {
  return key.split(",").map((s) => parseInt(s, 10));
}

// TODO: fully understand dijkstra's algorithm
function findShortestPath(start, end, grid) {
  const dist = {};
  const prev = {};
  let queue = [];

  grid.forEach((row, y) => {
    row.forEach((v, x) => {
      const key = coordsToKey([x, y]);
      dist[key] = Infinity;
      prev[key] = undefined;
      queue.push(key);
    });
  });

  dist[coordsToKey(start)] = 0;

  while (queue.length) {
    const u = queue.reduce((result, k) => {
      if (result === null || dist[k] < dist[result]) {
        return k;
      }
      return result;
    }, null);

    // part1 -> part2
    // if (u === coordsToKey(end)) {
    //   break;
    // }
    const key = keyToCoords(u);
    if (grid[key[1]][key[0]] === 0) {
      return dist[u];
    }

    queue = queue.filter((k) => k !== u);

    getNeighbours(key, grid)
      .map((c) => coordsToKey(c))
      .filter((k) => queue.includes(k))
      .forEach((k) => {
        const alt = dist[u] + 1;
        if (alt < dist[k]) {
          dist[k] = alt;
          prev[k] = u;
        }
      });
  }

  // part1 -> part2
  // return dist[coordsToKey(end)];
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const [start, end, grid] = parseInput(data);

    // part1 -> part2
    // const result = findShortestPath(start, end, grid);
    const result = findShortestPath(end, start, grid);

    console.log(result);

    // CORRECT ANSWER: 508
  } catch (err) {
    console.error(err);
  }
}

run();
