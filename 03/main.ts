import * as fs from 'node:fs';
import * as path from 'node:path';

function findMaxJoltage(bank: number[]) {
  const max = Math.max(...bank.slice(0, -1));
  const maxIndex = bank.indexOf(max);

  const secondDigitOptions = bank.slice(maxIndex + 1);
  const secondDigit = Math.max(...secondDigitOptions);

  return max * 10 + secondDigit;
}

function part1() {
  const fileName = 'input.txt';
  //   const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const banks = file.split('\n');

  let tot = 0;
  for (const bank of banks) {
    const joltage = findMaxJoltage(bank.split('').map(Number));
    tot += joltage;
  }

  console.log(tot);
}

function findMaxJoltage2(bank: number[]) {
  const out = [];
  let lastIndex = 0;

  for (let i = 0; i < 12; i++) {
    const options = bank.slice(lastIndex, bank.length - (11 - i));
    const max = Math.max(...options);
    lastIndex = options.indexOf(max) + lastIndex + 1;
    out.push(max);
  }

  return parseInt(out.join(''));
}

function part2() {
  const fileName = 'input.txt';
  //   const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const banks = file.split('\n');

  let tot = 0;
  for (const bank of banks) {
    const joltage = findMaxJoltage2(bank.split('').map(Number));
    tot += joltage;
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
