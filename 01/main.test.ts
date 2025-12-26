import { expect, test, describe } from 'bun:test';
import { getHundredsPlace, getModulo, getZeroCross } from './main';

describe('getZeroCross', () => {
  const cases = [
    { before: 0, after: 100, expected: 1 },
    { before: 0, after: 1000, expected: 10 },
    { before: 0, after: 101, expected: 1 },
    { before: 0, after: 200, expected: 2 },
    { before: 0, after: -5, expected: 0 },
    { before: 0, after: -105, expected: 1 },
    { before: 0, after: -100, expected: 1 },
    { before: 0, after: -205, expected: 2 },
    { before: 0, after: -1000, expected: 10 },
    { before: 0, after: -1001, expected: 10 },
    { before: 99, after: 101, expected: 1 },
    { before: 99, after: 201, expected: 2 },
    { before: 99, after: -1, expected: 1 },
    { before: 99, after: 1, expected: 0 },
    { before: 99, after: 0, expected: 1 },
    { before: 1, after: -1, expected: 1 },
    { before: 1, after: -101, expected: 2 },
    { before: 1, after: -201, expected: 3 },
    { before: 1, after: 0, expected: 1 },
  ];

  for (const { before, after, expected } of cases) {
    test(`should return ${expected} when moving from ${before} to ${after}`, () => {
      expect(getZeroCross(before, after)).toBe(expected);
    });
  }
});

describe('getModulo', () => {
  const cases = [
    { num: 100, expected: 0 },
    { num: 200, expected: 0 },
    { num: 1050, expected: 50 },
    { num: 101, expected: 1 },
    { num: 200, expected: 0 },
    { num: -5, expected: 95 },
    { num: -99, expected: 1 },
    { num: -105, expected: 95 },
    { num: -205, expected: 95 },
    { num: -100, expected: 0 },
    { num: -200, expected: 0 },
    { num: -1050, expected: 50 },
  ];
  for (const { num, expected } of cases) {
    test(`should return ${expected} when modulo of ${num} is ${num % 100}`, () => {
      expect(getModulo(num)).toBe(expected);
    });
  }
});

describe('getHundredsPlace', () => {
  const cases = [
    { num: 100, expected: 1 },
    { num: 200, expected: 2 },
    { num: 1050, expected: 10 },
    { num: 101, expected: 1 },
    { num: 200, expected: 2 },
    { num: -5, expected: 0 },
    { num: -99, expected: 0 },
    { num: -105, expected: -1 },
    { num: -205, expected: -2 },
    { num: -100, expected: -1 },
    { num: -200, expected: -2 },
    { num: -1050, expected: -10 },
  ];
  for (const { num, expected } of cases) {
    test(`should return ${expected} when hundreds place of ${num} is ${Math.floor(Math.abs(num) / 100)}`, () => {
      expect(getHundredsPlace(num)).toBe(expected);
    });
  }
});
