// THIS doesn't actually solve the stated problem.

const file = Bun.file("4/input.txt");
const input = await file.text();

// Helper function to get all possible directions for searching
const getDirections = () => [
	[-1, -1], [-1, 0], [-1, 1],  // up-left, up, up-right
	[0, -1], [0, 1],    // left, right
	[1, -1], [1, 0], [1, 1]    // down-left, down, down-right
];

// Check if a position is within grid bounds
const isValidPosition = (grid, row, col) =>
	row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

// Part 1: Find all instances of "XMAS"
function findXMAS(grid) {
	const target = "XMAS";
	let count = 0;

	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			if (grid[row][col] !== 'X') continue;

			// Check all directions from this X
			for (const [dRow, dCol] of getDirections()) {
				let found = true;

				// Check if the full word exists in this direction
				for (let i = 0; i < target.length; i++) {
					const newRow = row + dRow * i;
					const newCol = col + dCol * i;

					if (!isValidPosition(grid, newRow, newCol) ||
						grid[newRow][newCol] !== target[i]) {
						found = false;
						break;
					}
				}

				if (found) count++;
			}
		}
	}

	return count;
}

// Part 2: Find X-shaped MAS patterns
function findXMAS2(grid) {
	let count = 0;

	for (let row = 0; row < grid.length - 2; row++) {
		for (let col = 0; col < grid[0].length - 2; col++) {
			// Check both possible MAS strings in X pattern
			const checkXPattern = () => {
				// Top-left to bottom-right MAS
				const diagonal1 = [
					grid[row][col],
					grid[row + 1][col + 1],
					grid[row + 2][col + 2]
				].join('');

				// Top-right to bottom-left MAS
				const diagonal2 = [
					grid[row][col + 2],
					grid[row + 1][col + 1],
					grid[row + 2][col]
				].join('');

				return (
					(diagonal1 === 'MAS' || diagonal1 === 'SAM') &&
					(diagonal2 === 'MAS' || diagonal2 === 'SAM')
				);
			};

			if (checkXPattern()) count++;
		}
	}

	return count;
}

console.log("Part 1:", findXMAS(input));  // Should find all XMAS occurrences
console.log("Part 2:", findXMAS2(input)); // Should find all X-MAS patterns

