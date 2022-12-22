import { readFileSync } from "node:fs";

function coordsToKey(x, y, z) {
  return `${x},${y},${z}`;
}

function keyToCoords(key) {
  return key.split(",").map((x) => parseInt(x, 10));
}

function calculateAir(input, cubes) {
  const all = input.map((x) => keyToCoords(x));

  const allX = all.map(([x]) => x);
  const allY = all.map(([, y]) => y);
  const allZ = all.map(([, , z]) => z);

  const minX = Math.min(...allX) - 1;
  const maxX = Math.max(...allX) + 1;
  const minY = Math.min(...allY) - 1;
  const maxY = Math.max(...allY) + 1;
  const minZ = Math.min(...allZ) - 1;
  const maxZ = Math.max(...allZ) + 1;

  const air = new Set();

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        const key = coordsToKey(x, y, z);

        if (!cubes.has(key)) {
          air.add(key);
        }
      }
    }
  }

  return air;
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

function countOpenSides(cube, air) {
  return getNeighbourCoords(keyToCoords(cube)).reduce((total, coords) => {
    if (air.has(coordsToKey(...coords))) {
      total++;
    }

    return total;
  }, 0);
}

function walk(start, cubes) {
  const queue = [start];
  const seen = new Set([start]);

  while (queue.length > 0) {
    const current = queue.shift();

    getNeighbourCoords(keyToCoords(current)).forEach((c) => {
      const key = coordsToKey(...c);

      if (cubes.has(key) && !seen.has(key)) {
        queue.push(key);
        seen.add(key);
      }
    });
  }

  return seen;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    console.time("time");

    const input = data.split("\n");

    const cubes = new Set(input);
    const air = calculateAir(input, cubes);
    const outerAir = walk(coordsToKey(0, 0, 0), air);

    const result = [...cubes]
      .map((c) => countOpenSides(c, outerAir))
      .reduce((a, b) => a + b, 0);

    console.timeEnd("time");

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 58
    // CORRECT ANSWER: 2576
  } catch (err) {
    console.error(err);
  }
}

run();
