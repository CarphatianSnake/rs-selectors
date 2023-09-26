const pxToNumber = (str: string): number => {
  const reg = /^\d+(px)$/i;

  if (str.match(reg)) {
    return parseInt(str, 10);
  }

  return 0;
};

export default pxToNumber;
