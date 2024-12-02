const file = Bun.file('1/input.txt');
const input = await file.text();

const by_least = (a, b) => a - b;
const niave_zip = (...arrays) =>
	arrays[0].map((_, i) =>
		arrays.map(array => array[i]));

const dataset = input
	.split('\n')
	.filter(Boolean)
	.map(x => x.split(/\s+/).map(Number));

const result = niave_zip(
	dataset.map(x => x[0]).sort(by_least),
	dataset.map(x => x[1]).sort(by_least)
).reduce((total_difference, item) => {
	let [smaller, larger] = item.sort(by_least);
	return total_difference + (larger - smaller);
}, 0);

console.log(result)

