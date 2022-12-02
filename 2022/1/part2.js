const fs = require("fs/promises");

async function run() {
  try {
    const data = await fs.readFile("./input.txt", { encoding: "utf8" });

    const totalCaloriesPerElf = data.split("\n\n").map((str) =>
      str
        .split("\n")
        .map(Number)
        .reduce((total, num) => total + num, 0)
    );

    const result = totalCaloriesPerElf
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((total, num) => total + num, 0);

    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

run();
