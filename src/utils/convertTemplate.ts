import { Row, Cell } from "read-excel-file/types";

export const convertTemplate = (template: Row[]): number[][] => {
	return template.reduce((finalRows: number[][], currentRow: Row): number[][] => {
		if (currentRow.some((cell: Cell) => Number.isInteger(cell)))
		{
			return [
				...finalRows,
				currentRow.reduce((finalRow: number[], cell: Cell): number[] => Number.isInteger(cell) ? [...finalRow, (+cell)-1] : finalRow, [])
			];
		}
		return finalRows;
	}, []);
};