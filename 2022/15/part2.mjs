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
    const distanceToBeacon = calculateManhattanDistance(sensor, closestBeacon);

    minX = Math.min(minX, sensorX - distanceToBeacon);
    maxX = Math.max(maxX, sensorX + distanceToBeacon);

    return {
      sensor,
      closestBeacon,
      distanceToBeacon,
    };
  });

  return [input, minX, maxX];
}

function calculateManhattanDistance([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function calculateRanges(input, y, minX, maxX) {
  const ranges = [];

  input.forEach(({ sensor: [sensorX, sensorY], distanceToBeacon }) => {
    const distanceToLine = Math.abs(sensorY - y);

    if (distanceToLine <= distanceToBeacon) {
      const offset = distanceToBeacon - distanceToLine;
      const start = sensorX - offset;
      const end = sensorX + offset;

      if (start <= maxX && end >= minX) {
        ranges.push([Math.max(start, minX), Math.min(end, maxX)]);
      }
    }
  });

  ranges.sort(([x1, y1], [x2, y2]) => (x1 === x2 ? y1 - y2 : x1 - x2));

  const combinedRanges = [];

  for (let i = 0; i < ranges.length; i++) {
    if (!combinedRanges.length) {
      combinedRanges.push(ranges[i]);
    } else {
      const [start, end] = ranges[i];
      const [prevStart, prevEnd] = combinedRanges[combinedRanges.length - 1];

      if (start <= prevEnd) {
        combinedRanges[combinedRanges.length - 1] = [
          prevStart,
          Math.max(end, prevEnd),
        ];
      } else {
        combinedRanges.push(ranges[i]);
      }
    }
  }

  return combinedRanges;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    // example
    // const Y_LINE = 10;
    // input
    const Y_LINE = 2_000_000;

    const [input, minX, maxX] = parseInput(data);

    // console.log("minX", minX);
    // console.log("maxX", maxX);

    console.time("part1");

    const ranges = calculateRanges(input, Y_LINE, minX, maxX);

    let result = ranges.reduce((t, [s, e]) => t + (e - s), 0);

    console.timeEnd("part1");

    console.log(result);

    // CORRECT EXAMPLE ANSWER: ?
    // CORRECT ANSWER: ?
  } catch (err) {
    console.error(err);
  }
}

run();
