import { readFileSync } from "node:fs";

function buildDirStructure(data) {
  const commandsWithOuput = data
    .split("$ ")
    .slice(1)
    .map((x) => x.split("\n").filter(Boolean));

  const structure = {};
  let dirChanges = [];

  function currentDir() {
    return dirChanges.reduce((a, b) => a[b], structure);
  }

  commandsWithOuput.forEach(([command, ...output]) => {
    if (command === "ls") {
      const d = currentDir();

      output.forEach((o) => {
        const [dirOrSize, name] = o.split(" ");

        if (dirOrSize === "dir") {
          d[name] = {};
        } else {
          d[name] = parseInt(dirOrSize, 10);
        }
      });
    } else {
      const [_, d] = command.split(" ");

      if (d === "/") {
        dirChanges = [];
      } else if (d === "..") {
        dirChanges.pop();
      } else {
        dirChanges.push(d);
      }
    }
  });

  return structure;
}

function calculateDirSizes(structure) {
  const dirSizes = {};

  function walkTree(obj, dirName) {
    return Object.entries(obj).reduce((total, [k, v]) => {
      if (typeof v === "object") {
        const nestedDirName = dirName ? `${dirName}.${k}` : k;
        const dirTotal = walkTree(v, nestedDirName);
        total += dirTotal;
        dirSizes[nestedDirName] = dirTotal;
      } else {
        total += v;
      }

      return total;
    }, 0);
  }

  const totalSize = walkTree(structure);

  dirSizes["/"] = totalSize;

  return dirSizes;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const structure = buildDirStructure(data);
    const dirSizes = calculateDirSizes(structure);

    const result = Object.values(dirSizes)
      .filter((v) => v < 100000)
      .reduce((a, b) => a + b, 0);

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 95437

    // WRONG ANSWERS: 1279412
    // CORRECT ANSWER: 1648397
  } catch (err) {
    console.error(err);
  }
}

run();
