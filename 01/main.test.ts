import { expect, test, describe } from 'bun:test';
import { getZeroCross } from './main';

describe('getZeroCross', () => {
  const cases = [
    { before: 0, after: 100, expected: 1 },
    { before: 0, after: 101, expected: 1 },
    { before: 0, after: 200, expected: 2 },
    { before: 0, after: -5, expected: 0 },
    { before: 0, after: -105, expected: 1 },
    { before: 0, after: -205, expected: 2 },
    { before: 99, after: 101, expected: 1 },
    { before: 99, after: 201, expected: 2 },
    { before: -1, after: 1, expected: 1 },
    { before: -1, after: -5, expected: 0 },
    { before: -1, after: -100, expected: 1 },
    { before: -1, after: -101, expected: 1 },
    { before: -1, after: -201, expected: 2 },
    { before: 1, after: -1, expected: 1 },
    { before: 1, after: -101, expected: 2 },
    { before: 1, after: -201, expected: 3 },
  ];

  for (const { before, after, expected } of cases) {
    test(`should return ${expected} when moving from ${before} to ${after}`, () => {
      expect(getZeroCross(before, after)).toBe(expected);
    });
  }
});
