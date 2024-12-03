const file = Bun.file("2/sample.txt");
const input = await file.text();

const dataset = input
  .split("\n")
  .filter(Boolean)
  .map((x) => x.split(/\s+/).map(Number));

const differences = [];

for (let i = 0; i < dataset.length; i++) {
  const line_differences = [];
  for (let j = 0; j < dataset[i].length - 1; j++) {
    line_differences.push(dataset[i][j] - dataset[i][j + 1]);
  }
  differences.push(line_differences);
}

const verdicts = [];

for (let i = 0; i < differences.length; i++) {
  if (differences[i].every((x) => [-3, -2, -1].includes(x))) {
    verdicts.push("safe");
  }
  if (differences[i].every((x) => [1, 2, 3].includes(x))) {
    verdicts.push("safe");
  }
  verdicts.push("unsafe");
}

console.log(verdicts);

console.log(
  verdicts.reduce((acc, item) => {
    if (item === "safe") {
      return acc + 1;
    }
    return acc;
  }, 0),
);
