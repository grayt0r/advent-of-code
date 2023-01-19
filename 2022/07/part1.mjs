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
  function walkDirs(currentDir, dirName, dirCallback) {
    return Object.entries(currentDir).reduce((total, [k, v]) => {
      if (typeof v === "object") {
        const nestedDirName = dirName === "/" ? k : `${dirName}.${k}`;
        const dirTotal = walkDirs(v, nestedDirName, dirCallback);
        total += dirTotal;
        dirCallback(nestedDirName, dirTotal);
      } else {
        total += v;
      }

      return total;
    }, 0);
  }

  const dirSizes = {};
  const totalSize = walkDirs(
    structure,
    "/",
    (dirName, size) => (dirSizes[dirName] = size)
  );
  dirSizes["/"] = totalSize;

  return dirSizes;
}

// ALTERNATIVE
function buildDirSizes(data) {
  const commandsWithOutput = data
    .split("$ ")
    .slice(1)
    .map((x) => x.split("\n").filter(Boolean));

  let dirChanges = [];
  const dirSizes = {};

  commandsWithOutput.forEach(([command, ...output]) => {
    if (command === "ls") {
      output
        .filter((o) => !o.startsWith("dir"))
        .forEach((o) => {
          const [sizeStr] = o.split(" ");
          const size = parseInt(sizeStr, 10);

          dirChanges.forEach((_, i) => {
            const path = dirChanges.slice(0, i + 1).join(".");
            dirSizes[path] = (dirSizes[path] ?? 0) + size;
          });
        });
    } else {
      const [, d] = command.split(" ");

      if (d === "/") {
        dirChanges = [d];
      } else if (d === "..") {
        dirChanges.pop();
      } else {
        dirChanges.push(d);
      }
    }
  });

  return dirSizes;
}

function run() {
  try {
    // const data = readFileSync("./example.txt", { encoding: "utf8" });
    const data = readFileSync("./input.txt", { encoding: "utf8" });

    const structure = buildDirStructure(data);
    const dirSizes = calculateDirSizes(structure);

    // ALTERNATIVE: after seeing part 2 and knowing that we only ever care
    // about dir sizes we can skip building the dir structure and just
    // directly build the dir sizes
    // const dirSizes = buildDirSizes(data);

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
