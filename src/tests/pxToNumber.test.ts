import { pxToNumber } from 'utils';

describe('Test pxToNumber', () => {
  test('Returns a number on a valid passed string', () => {
    expect(pxToNumber('512px')).toBe(512);
  });
  test('Returns 0 on an invalid passed string', () => {
    expect(pxToNumber('123')).toBe(0);
    expect(pxToNumber('apx')).toBe(0);
    expect(pxToNumber('1apx')).toBe(0);
    expect(pxToNumber('a1px')).toBe(0);
    expect(pxToNumber('px')).toBe(0);
  });
});
