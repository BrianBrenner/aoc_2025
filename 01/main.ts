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

function part2() {
  const fileName = 'input.txt';
  //   const fileName = 'test.txt';
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

    const zeroCross = Math.abs(Math.floor(numAfter / 100) - Math.floor(num / 100));

    count += zeroCross;

    num = numAfter;
  }

  console.log(count);
}

function main() {
  //   part1();
  part2();
}

main();
