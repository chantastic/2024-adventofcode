//const file = Bun.file("3/sample.txt");
//const input = await file.text();
//
//function extract_valid_math(input) {
//	const test = new RegExp(/mul\(\d+,\d+\)/g);
//	return input.match(test);
//}
//
//function mul(a, b) {
//	return a * b;
//}
//
//const result = extract_valid_math(input)
//	.map(x => eval(x))
//	.reduce((acc, item) => acc + item, 0)
//
//console.log(result)

const file = Bun.file("3/input.txt");
const input = await file.text();

function extract_valid_instructions(input) {
	const test = new RegExp(/do\(\)|don\'t\(\)|mul\(\d+,\d+\)/g);
	return input.match(test);
}

function remove_bypassed_commands(input) {
	const instructions = [];
	let bypass_instructions = false

	for (let i = 0; i < input.length; i++) {
		if (input[i] === "do()") {
			bypass_instructions = false;
			continue;
		}
		if (bypass_instructions) {
			continue;
		}
		if (input[i] === "don't()") {
			bypass_instructions = true;
			continue;
		}
		instructions.push(input[i]);
	}
	return instructions;
}

function mul(a, b) {
	return a * b;
}

const result = remove_bypassed_commands(extract_valid_instructions(input))
	.map(x => eval(x))
	.reduce((acc, item) => acc + item, 0)

console.log(result)
