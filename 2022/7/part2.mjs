import { readFileSync } from "node:fs";

function buildDirStructure(data) {
  const commandsWithOutput = data
    .split("$ ")
    .slice(1)
    .map((x) => x.split("\n").filter(Boolean));

  const structure = {};
  let dirChanges = [];

  function currentDir() {
    return dirChanges.reduce((a, b) => a[b], structure);
  }

  commandsWithOutput.forEach(([command, ...output]) => {
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
      const [, d] = command.split(" ");

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

    const requiredSpace = dirSizes["/"] - (70000000 - 30000000);

    const result = Object.values(dirSizes)
      .filter((v) => v > requiredSpace)
      .sort((a, b) => a - b)[0];

    // ALTERNATIVE
    // const result = Math.min(
    //   ...Object.values(dirSizes).filter((v) => v > requiredSpace)
    // );

    console.log(result);

    // CORRECT EXAMPLE ANSWER: 24933642

    // CORRECT ANSWER: 1815525
  } catch (err) {
    console.error(err);
  }
}

run();
