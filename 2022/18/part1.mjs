import { readFileSync } from "node:fs";

function coordsToKey(x, y, z) {
  return `${x},${y},${z}`;
}

function keyToCoords(key) {
  return key.split(",").map((x) => parseInt(x, 10));
}

function getNeighbourCoords([x, y, z]) {
  return [
    [x - 1, y, z],
    [x + 1, y, z],
    [x, y - 1, z],
    [x, y + 1, z],
    [x, y, z - 1],
    [x, y, z + 1],
  ];
}

function countOpenSides(cube, cubes) {
  return getNeighbourCoords(keyToCoords(cube)).reduce((total, [x, y, z]) => {
    if (!cubes.has(coordsToKey(x, y, z))) {
      total++;
    }

    return total;
  }, 0);
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    console.time("time");

    const input = data.split("\n");

    const cubes = new Set(input);

    const result = [...cubes]
      .map((c) => countOpenSides(c, cubes))
      .reduce((a, b) => a + b, 0);

    console.timeEnd("time");

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 64
    // CORRECT ANSWER: 4482
  } catch (err) {
    console.error(err);
  }
}

run();
