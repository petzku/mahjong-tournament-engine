export const formatPoints = (params: {points: number, sign: boolean}): string => {
	const toString = (params.points/1000).toString();
	return `${params.sign && params.points > 0 ? "+" : ""}${toString}${toString.indexOf(".") == -1 ? ".0" : ""}`;
};