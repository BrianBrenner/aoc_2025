import * as fs from 'node:fs';
import * as path from 'node:path';

function canMove(grid: string[][], i: number, j: number) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ] as const;

  let count = 0;
  for (const direction of directions) {
    const [di, dj] = direction;
    const newI = i + di;
    const newJ = j + dj;
    if (
      newI < 0 ||
      newI >= grid.length ||
      newJ < 0 ||
      newJ >= grid[0]!.length
    ) {
      continue;
    }
    if (grid[newI]![newJ] === '@') {
      count += 1;
    }
  }

  return count < 4;
}

function part1() {
  const fileName = 'input.txt';
  //   const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');

  const grid = file.split('\n').map((line) => line.split(''));

  let tot = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i]!.length; j++) {
      if (grid[i]![j] === '@' && canMove(grid, i, j)) {
        tot += 1;
      }
    }
  }

  console.log(tot);
}

function moveRolls(grid: string[][]) {
  let numMoved = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i]!.length; j++) {
      if (grid[i]![j] === '@' && canMove(grid, i, j)) {
        grid[i]![j] = '.';
        numMoved += 1;
      }
    }
  }

  return numMoved;
}

function part2() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');

  const grid = file.split('\n').map((line) => line.split(''));

  let tot = 0;
  while (true) {
    const numMoved = moveRolls(grid);
    if (numMoved === 0) {
      break;
    }
    tot += numMoved;
  }

  console.log(tot);
}

function main() {
  part1();
  part2();
}

if (import.meta.main) {
  main();
}
