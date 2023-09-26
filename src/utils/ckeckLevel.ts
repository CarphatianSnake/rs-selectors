import tasksData from 'data';

const checkLevel = (level: number): number => {
  const min = 0;
  const max = tasksData.length - 1;

  if (level < min) {
    return min;
  }

  if (level > max) {
    return max;
  }

  return level;
};

export default checkLevel;
