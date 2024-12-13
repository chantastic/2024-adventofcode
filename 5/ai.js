const file = Bun.file('5/input.txt');
const input = await file.text();

function parseInput(input) {
	const [rulesSection, updatesSection] = input.trim().split('\n\n');
	const rules = new Map();
	rulesSection.split('\n').forEach(rule => {
		const [before, after] = rule.split('|').map(Number);
		if (!rules.has(before)) rules.set(before, new Set());
		rules.get(before).add(after);
	});
	const updates = updatesSection.split('\n').map(update => update.split(',').map(Number));
	return { rules, updates };
}


function isCorrectOrder(update, rules) {
	for (let i = 0; i < update.length; i++) {
		for (let j = i + 1; j < update.length; j++) {
			console.log(i, j);
			if (rules.has(update[j]) && rules.get(update[j]).has(update[i])) {
				return false;
			}
		}
	}
	return true;
}

function findMiddlePage(update) {
	return update[Math.floor(update.length / 2)];
}

function sortUpdate(update, rules) {
	return update.sort((a, b) => {
		if (rules.has(b) && rules.get(b).has(a)) return 1;
		if (rules.has(a) && rules.get(a).has(b)) return -1;
		return 0;
	});
}

function processUpdates(rules, updates) {
	let sum = 0;
	for (let update of updates) {
		if (!isCorrectOrder(update, rules)) {
			const sortedUpdate = sortUpdate([...update], rules);
			sum += findMiddlePage(sortedUpdate);
		}
	}
	return sum;
}

//function processUpdates(rules, updates) {
//	let sum = 0;
//	for (let update of updates) {
//		if (isCorrectOrder(update, rules)) {
//			sum += findMiddlePage(update);
//		}
//	}
//	return sum;
//}

const { rules, updates } = parseInput(input);
const result = processUpdates(rules, updates);

console.log(result);

