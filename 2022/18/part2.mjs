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

    // TODO: calculate these limits programmatically
    // example
    // const X_START = 0;
    // const X_END = 4;
    // const Y_START = 0;
    // const Y_END = 4;
    // const Z_START = 0;
    // const Z_END = 7;
    // input
    const X_START = -1;
    const X_END = 21;
    const Y_START = -1;
    const Y_END = 22;
    const Z_START = -1;
    const Z_END = 22;

    console.time("time");

    const input = data.split("\n");

    const cubes = new Set(input);
    const air = new Set();

    for (let x = X_START; x <= X_END; x++) {
      for (let y = Y_START; y <= Y_END; y++) {
        for (let z = Z_START; z <= Z_END; z++) {
          const key = coordsToKey(x, y, z);

          if (!cubes.has(key)) {
            air.add(key);
          }
        }
      }
    }

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
