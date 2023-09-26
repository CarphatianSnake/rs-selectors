import tasksData from 'data';
import { checkLevel } from 'utils';

describe('checkLevel', () => {
  const MIN_LEVEL = 0;
  const MAX_LEVEL = tasksData.length - 1;

  test('Check value between min and max', () => {
    const randomLvl = 5;

    expect(checkLevel(randomLvl)).toBe(randomLvl);
  });

  test('Check if value less then min level, then return min level value', () => {
    const VALUE = MIN_LEVEL - 1;

    expect(checkLevel(VALUE)).toBe(MIN_LEVEL);
  });

  test('Check if value bigger then max value, then return max level value', () => {
    const VALUE = MAX_LEVEL + 1;
    expect(checkLevel(VALUE)).toBe(MAX_LEVEL);
  });
});
