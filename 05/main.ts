import * as fs from 'node:fs';
import * as path from 'node:path';

function isFresh(num: number, rangePairs: number[][]) {
  for (const [start, end] of rangePairs) {
    if (num >= start! && num <= end!) {
      return true;
    }
  }

  return false;
}

function part1() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');

  const [ranges, rawNums] = file.split('\n\n');
  const rangePairs = ranges!.split('\n').map((range) => range.split('-').map(Number));

  const nums = rawNums!.split('\n').map(Number);

  let tot = 0;
  for (const num of nums) {
    if (isFresh(num, rangePairs)) {
      tot++;
    }
  }
  console.log(tot);
}

function mergeRanges(rangePairs: number[][]) {
  const merged = [rangePairs[0]!];
  for (const [start, end] of rangePairs) {
    const lastEnd = merged[merged.length - 1]![1];
    if (start <= lastEnd) {
      merged[merged.length - 1]![1] = Math.max(lastEnd, end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}

function part2() {
  const fileName = 'input.txt';
  // const fileName = 'test.txt';
  const filePath = path.join(import.meta.dirname, fileName);

  const file = fs.readFileSync(filePath, 'utf8');

  const [ranges] = file.split('\n\n');
  const rangePairs = ranges!.split('\n').map((range) => range.split('-').map(Number));

  rangePairs.sort((a, b) => a[0]! - b[0]!);

  const merged = mergeRanges(rangePairs);
  let tot = 0;
  for (const [start, end] of merged) {
    tot += end - start + 1;
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
