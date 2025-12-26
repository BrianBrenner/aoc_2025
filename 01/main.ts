import * as fs from 'node:fs';
import * as path from 'node:path';

function part1() {
  const fileName = 'input.txt';
  //   const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const lines = file.split('\n');

  let num = 50;
  let count = 0;
  for (const line of lines) {
    if (line.startsWith('L')) {
      num -= parseInt(line.slice(1));
    } else {
      num += parseInt(line.slice(1));
    }

    if (num % 100 === 0) {
      count++;
    }
  }

  console.log(count);
}

export function getHundredsPlace(num: number) {
  const digit = Math.floor(Math.abs(num) / 100);
  return digit === 0 ? 0 : digit * Math.sign(num);
}

export function getZeroCross(numBefore: number, numAfter: number) {
  if (numBefore >= 100 || numBefore < 0) {
    throw new Error(`numBefore is out of range: ${numBefore}`);
  }

  let count = Math.abs(getHundredsPlace(numAfter) - getHundredsPlace(numBefore));

  if (Math.sign(numBefore) !== Math.sign(numAfter) && numBefore !== 0) {
    count += 1;
  }

  return count;
}

export function getModulo(num: number) {
  if (num >= 0) {
    return num % 100;
  }
  return ((num % 100) + 100) % 100;
}

function part2() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const lines = file.split('\n');

  let num = 50;
  let count = 0;
  for (const line of lines) {
    let numAfter = num;
    if (line.startsWith('L')) {
      numAfter -= parseInt(line.slice(1));
    } else {
      numAfter += parseInt(line.slice(1));
    }

    count += getZeroCross(num, numAfter);

    num = getModulo(numAfter);
  }

  console.log(count);
}

function main() {
  part1();
  part2();
}

if (import.meta.main) {
  main();
}
