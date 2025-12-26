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

// 99 -> 101
// -1 -> 1
// 0 -> 100
// 0 -> 200
// 0 -> -5

export function getHundredsPlace(num: number) {
  const digit = Math.floor(Math.abs(num) / 100) % 10;
  return digit === 0 ? 0 : digit * Math.sign(num);
}

export function getZeroCross(numBefore: number, numAfter: number) {
  if (numBefore >= 100 || numBefore <= -100) {
    throw new Error('numBefore is out of range');
  }

  let count = Math.abs(getHundredsPlace(numAfter) - getHundredsPlace(numBefore));
  if (Math.sign(numAfter) !== Math.sign(numBefore) && numBefore % 100 !== 0) {
    count += 1;
  }

  return count;
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

    console.log('num', num);
    console.log('numAfter', numAfter);
    console.log('count', count);

    num = numAfter % 100;
  }

  console.log(count);
}

function main() {
  //   part1();
  part2();
}

if (import.meta.main) {
  main();
}
