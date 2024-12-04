const file = Bun.file("4/input.txt");
const input = await file.text();

const dataset = input
	.split("\n")
	.filter(Boolean)
	.map(x => x.split(""));

function get_xmas_count(input, i, j) {
	let count = 0;

	if (input[i + 0]?.[j + 1] === "M" && input[i + 0]?.[j + 2] === "A" && input[i + 0]?.[j + 3] === "S") {
		count++;
	}
	if (input[i + 1]?.[j + 1] === "M" && input[i + 2]?.[j + 2] === "A" && input[i + 3]?.[j + 3] === "S") {
		count++;
	}
	if (input[i + 1]?.[j + 0] === "M" && input[i + 2]?.[j + 0] === "A" && input[i + 3]?.[j + 0] === "S") {
		count++;
	}
	if (input[i + 1]?.[j - 1] === "M" && input[i + 2]?.[j - 2] === "A" && input[i + 3]?.[j - 3] === "S") {
		count++;
	}
	if (input[i + 0]?.[j - 1] === "M" && input[i + 0]?.[j - 2] === "A" && input[i + 0]?.[j - 3] === "S") {
		count++;
	}
	if (input[i - 1]?.[j - 1] === "M" && input[i - 2]?.[j - 2] === "A" && input[i - 3]?.[j - 3] === "S") {
		count++;
	}
	if (input[i - 1]?.[j - 0] === "M" && input[i - 2]?.[j - 0] === "A" && input[i - 3]?.[j - 0] === "S") {
		count++;
	}
	if (input[i - 1]?.[j + 1] === "M" && input[i - 2]?.[j + 2] === "A" && input[i - 3]?.[j + 3] === "S") {
		count++;
	}

	return count;
}

function get_x_locations(input) {
	let count = 0;

	for (const [i, row] of input.entries()) {
		for (const [j, char] of row.entries()) {
			if (char === "X") {
				count += get_xmas_count(input, i, j);
			}
		}
	}

	return count;
}

const result = get_x_locations(dataset);

console.log(result);
