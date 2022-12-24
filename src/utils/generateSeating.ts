import { generateArray } from "./generateArray";

export const generateSeating = (params: {roundCount: number, tableCount: number, playerCount: number}) => {
	/** Note: This algorithm generates VERY BAD seatings. TODO: Replate with something better.*/
	const rounds = generateArray(params.roundCount);
	const tables = generateArray(params.tableCount);

	const temporaryTemplate: number[][][] = [
		rounds.map((round: number): number[] => (
			tables.map((table: number): number => (4*table+round)%params.playerCount)
		)),
		rounds.map((round: number): number[] => (
			tables.map((table: number): number => (4*table+round+1)%params.playerCount)
		)),
		rounds.map((round: number): number[] => (
			tables.map((table: number): number => (4*table+round+2)%params.playerCount)
		)),
		rounds.map((round: number): number[] => (
			tables.map((table: number): number => (4*table+round+3)%params.playerCount)
		))
	];

	return generateArray(params.playerCount).map((row: number) => (
		rounds.map((round: number) => {
			const table = Math.floor(row / 4);
			const wind = row % 4;

			return temporaryTemplate[wind][round][table];
		})
	));
}