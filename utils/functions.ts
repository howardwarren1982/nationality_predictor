export const getFlagIcon = function (code: string) {
  const output = `https://countryflagsapi.com/svg/${code}`;
  return output;
};

export const convertToThreeDigitPercent = function (input: number) {
  return Math.round(input * 100);
};
