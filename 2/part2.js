const file = Bun.file("2/sample.txt");
const input = await file.text();

const dataset = input
  .split("\n")
  .filter(Boolean)
  .map((x) => x.split(/\s+/).map(Number));

const next_is_greater = (item, index, array) => { return (index === array.length - 1) ? true : item < array[index + 1] }
const next_is_lesser = (item, index, array) => { return (index === array.length - 1) ? true : item > array[index + 1] }
const next_delta_is_in_positive_bounds = (item, index, array) => {
  return (index === array.length - 1) ? true : [1, 2, 3].includes(item - array[index + 1])
}
const next_delta_is_in_negative_bounds = (item, index, array) => {
  return (index === array.length - 1) ? true : [-1, -2, -3].includes(item - array[index + 1])
}

function is_safe(row) {
  if (row.every(next_is_lesser) && row.every(next_delta_is_in_positive_bounds)) {
    return "safe";
  }

  if (row.every(next_is_greater) && row.every(next_delta_is_in_negative_bounds)) {
    return "safe";
  }

  return "unsafe";
}

function problem_dampener(data) {
  return data.map((row) => {
    return row.map((item, index, array) => {
    }
  })
}

console.log(problem_dampener(dataset).map(is_safe));
