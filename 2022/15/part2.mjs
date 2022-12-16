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
    const distanceToBeacon = calculateManhattanDistance(sensor, [
      beaconX,
      beaconY,
    ]);

    minX = Math.min(minX, sensorX - distanceToBeacon);
    maxX = Math.max(maxX, sensorX + distanceToBeacon);

    return {
      sensor,
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

    const [input] = parseInput(data);
    const minX = 0;
    const maxX = 4_000_000;

    console.time("part2");

    let y;
    let ranges;

    for (y = 0; y < 4_000_000; y++) {
      ranges = calculateRanges(input, y, minX, maxX);

      if (ranges.length > 1) {
        break;
      }
    }

    const x = ranges[0][1] + 1;

    const result = x * 4_000_000 + y;

    console.timeEnd("part2");

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 56000011
    // CORRECT ANSWER: 10382630753392
  } catch (err) {
    console.error(err);
  }
}

run();
