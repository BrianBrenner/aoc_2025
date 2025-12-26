import * as fs from 'node:fs';
import * as path from 'node:path';

function isInvalid(num: number) {
  const str = num.toString();
  if (str.length % 2 !== 0) {
    return false;
  }

  if (str.slice(0, str.length / 2) !== str.slice(str.length / 2)) {
    return false;
  }

  return true;
}

function sumInvalid(start: number, end: number) {
  let tot = 0;
  for (let i = start; i <= end; i++) {
    if (isInvalid(i)) {
      tot += i;
    }
  }
  return tot;
}

function part1() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const ranges = file.split(',');

  let tot = 0;
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    console.log(end! - start!);
    tot += sumInvalid(start!, end!);
  }

  console.log(tot);
}

function generateInvalid(numDigits: number, cache: Map<number, Set<number>>) {
  if (cache.has(numDigits)) {
    return cache.get(numDigits)!;
  }

  const invalidNumbers = new Set<number>();
  for (let patternLength = 1; patternLength <= Math.floor(numDigits / 2); patternLength++) {
    if (numDigits % patternLength !== 0) {
      continue;
    }

    for (let i = 10 ** (patternLength - 1); i < 10 ** patternLength; i++) {
      const repeatedPattern = i.toString().repeat(numDigits / patternLength);
      invalidNumbers.add(parseInt(repeatedPattern));
    }
  }

  cache.set(numDigits, invalidNumbers);
  return invalidNumbers;
}

function sumInvalidPart2(start: number, end: number, cache: Map<number, Set<number>>) {
  const startDigits = start.toString().length;
  const endDigits = end.toString().length;
  const invalidNumbers = new Set<number>();
  for (let i = startDigits; i <= endDigits; i++) {
    const invalidNumbersForDigits = generateInvalid(i, cache);
    for (const invalidNumber of invalidNumbersForDigits) {
      if (invalidNumber >= start && invalidNumber <= end) {
        invalidNumbers.add(invalidNumber);
      }
    }
  }
  return Array.from(invalidNumbers).reduce((a, b) => a + b, 0);
}

function part2() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');
  const ranges = file.split(',');

  let tot = 0;
  const cache = new Map<number, Set<number>>();
  for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    tot += sumInvalidPart2(start!, end!, cache);
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
