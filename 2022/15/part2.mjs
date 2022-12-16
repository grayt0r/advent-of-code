import { readFileSync } from "node:fs";

function parseInput(data) {
  let minX = Infinity;
  let maxX = 0;

  const input = data.split("\n").map((x) => {
    const [sensorX, sensorY, beaconX, beaconY] = x
      .match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
      )
      .slice(1)
      .map((y) => parseInt(y, 10));

    const sensor = [sensorX, sensorY];
    const closestBeacon = [beaconX, beaconY];
    const distance = calculateManhattanDistance(sensor, closestBeacon);

    minX = Math.min(minX, sensorX - distance);
    maxX = Math.max(maxX, sensorX + distance);

    return {
      sensor,
      closestBeacon,
      distance,
    };
  });

  return [input, minX, maxX];
}

function calculateManhattanDistance([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    // example
    // const y = 10;
    // input
    const y = 2_000_000;

    const [input, minX, maxX] = parseInput(data);

    // console.log("minX:", minX);
    // console.log("maxX:", maxX);
    // console.log("input:", input);

    console.time("part1");

    let result = 0;

    for (let x = minX; x <= maxX; x++) {
      const cannotBeBeacon = input.some(
        ({ sensor, closestBeacon: [beaconX, beaconY], distance }) => {
          if (x === beaconX && y === beaconY) {
            return false;
          }

          return calculateManhattanDistance(sensor, [x, y]) <= distance;
        }
      );

      if (cannotBeBeacon) {
        result++;
      }
    }

    // TODO: improve perf
    console.timeEnd("part1");

    console.log(result);

    // CORRECT ANSWER: ?
  } catch (err) {
    console.error(err);
  }
}

run();
