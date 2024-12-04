const file = Bun.file("3/input.txt");
const input = await file.text();

function extract_valid_math(input) {
	const test = new RegExp(/mul\(\d+,\d+\)/g);
	return input.match(test);
}

function mul(a, b) {
	return a * b;
}

const result = extract_valid_math(input)
	.map(x => eval(x))
	.reduce((acc, item) => acc + item, 0)

console.log(result)
