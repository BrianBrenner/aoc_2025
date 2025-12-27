import * as fs from 'node:fs';
import * as path from 'node:path';

function doMath(operators: string[], numbers: number[][]) {
  let tot = 0;
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    if (operator === '+') {
      tot += numbers[i].reduce((a, b) => a + b, 0);
    } else {
      tot += numbers[i].reduce((a, b) => a * b, 1);
    }
  }
  return tot;
}

function part1() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const lines = file.split('\n');

  const operators = lines[lines.length - 1]!.trim().split(/\s+/);
  const numbers = lines.slice(0, lines.length - 1).map((line) => line.trim().split(/\s+/).map(Number));

  const transposed = numbers[0].map((_, colIndex) => numbers.map((row) => row[colIndex]));

  console.log(doMath(operators, transposed));
}

function reformatNumbers(numbers: number[][]) {
  return numbers.map(formatRow);
}

function formatRow(row: number[]) {
  const maxLen = Math.max(...row.map(String).map((s) => s.length));
  const padded = row.map((num) => num.toString().padStart(maxLen, ' '));

  const final = [];
  for (let i = 0; i < padded.length; i++) {
    let out = '';
    for (let j = 0; j < padded[i].length; j++) {
      if (padded[j][i] === ' ') {
        continue;
      }
      out += padded[j][i];
    }
    final.push(parseInt(out));
  }

  return final;
}

// this is incorrect, but don't care to fix it
// didn't realize padding was different, this is annoying
function part2() {
  // const fileName = 'input.txt';
  const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const lines = file.split('\n');

  const operators = lines[lines.length - 1]!.trim().split(/\s+/);
  const numbers = lines.slice(0, lines.length - 1).map((line) => line.trim().split(/\s+/).map(Number));

  const transposed = numbers[0].map((_, colIndex) => numbers.map((row) => row[colIndex]));

  const formatted = reformatNumbers(transposed);
  console.log(formatted);
}

function main() {
  part1();
  part2();
}

if (import.meta.main) {
  main();
}
