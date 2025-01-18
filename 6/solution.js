const file = Bun.file('6/sample.txt');
const text = await file.text();

const field = text.split('\n').filter(Boolean).map(line => line.split(''));

function locateGuard(field) {
	if (!field) return;

	for (let y = 0; y < field.length; y++) {
		for (let x = 0; x < field[y].length; x++) {
			if (['^', '>', 'v', '<'].includes(field[y][x])) {
				return { x, y, orientation: field[y][x] };
			}
		}
	}
	// LEARNED: can't early return out of forEach loop
	// https://www.perplexity.ai/search/why-can-t-i-early-return-out-o-dC0dJpGHRdiSKal0hM8yYg
	//field.forEach((row, i) => {
	//	row.forEach((col, j) => {
	//		if (col === '^') {
	//			return [j, i];
	//		}
	//	})
	//})
}
//
//
//function moveGuard(field) {
//	const pos = locateGuard(field);
//	console.log(pos);
//
//	if (!pos) {
//		return;
//	}
//
//	if (field[pos[1]][pos[0] === 'v') {
//		return moveGuald();
//	}
//
//	//if (field[y][x] === '^') {
//	//	field[
//	//	moveGuard(field);
//	//}
//}
//
//moveGuard(field);
////console.log(result);
//

function act(field) {
	const guard = locateGuard(field);
	if (!guard) return;

	const result = field;
	const { x, y, orientation } = guard;

	//const lookup = {
	//	"^": [y - 1, x],
	//	">": [y, x + 1],
	//	"v": [y + 1, x],
	//	"<": [x, y - 1]
	//};

	switch (orientation) {
		case "^": {
			if (!field[y - 1]) {
				result[y][x] = 'X';
			}

			if (field[y - 1][x] === '#') {
				result[y][x] = '>';
			}


			result[y - 1][x] = '^';
			result[y][x] = 'X';

			break;
		}
		case ">": {
			if (!field[y][x + 1]) return result[y][x] = 'X';

			if (field[y][x + 1] === '#') {
				return result[y][x] = 'v';
			}

			result[y][x + 1] = '>';
			result[y][x] = 'X';

			break;
		}
		case "v": {
			if (!field[y + 1]) return result[y][x] = 'X';

			if (field[y + 1][x] === '#') {
				return result[y][x] = '<';
			}

			result[y + 1][x] = 'v';
			result[y][x] = 'X';

			break;
		}
		case "<": {
			if (!field[y][x - 1]) return result[y][x] = 'X';

			if (field[y][x - 1] && field[y][x - 1] === '#') {
				return result[y][x] = '^';
			}

			result[y][x - 1] = '<';
			result[y][x] = 'X';

			break
		}
	}

	return result;
}

//let result = act(field);
//while (result) {
//	result = act(field);
//	console.log(field.map(row => row.join('')).join('\n'));
//	console.log('\n\n');
//}
//let result = field;
//let out_of_bounds = false;
//do {
//	let next = act(result);
//	if (!next) {
//		out_of_bounds = true;
//		break;
//	}
//	result = act(result);
//} while (!out_of_bounds);
//
//console.log(result.reduce((acc, item) => acc += item.filter(char => char === 'X').length, 0));
let result = field;

for (let i = 0; i < 55; i++) {
	result = act(field);
	console.log(field.map(row => row.join('')).join('\n'));
	console.log("\n\n");
}

console.log(result.reduce((acc, item) => acc += item.filter(char => char === 'X').length, 0));
