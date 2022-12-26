import { Standing } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";

const getComparisons = (params: {
	standings: Standing[][],
	afterRound: number,
	playerCount: number
}) => {
	return generateArray(params.playerCount).map((playerId: number) => {
		if (params.afterRound === 0)
		{
			return 0;
		}

		const previousPlacement = params.standings[params.afterRound - 1].findIndex((standing: Standing) => standing.playerId === playerId);
		const currentPlacement = params.standings[params.afterRound].findIndex((standing: Standing) => standing.playerId === playerId);
		return previousPlacement - currentPlacement;
	});
};

export default getComparisons;