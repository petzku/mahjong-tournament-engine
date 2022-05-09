export const formatPoints = (points: number): string => {
  const toString = (points/1000).toString();
  return toString.indexOf(".") === -1 ? `${toString}.0` : toString;
};