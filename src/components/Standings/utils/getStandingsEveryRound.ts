import { Tournament } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import { getStandings } from "../../../utils/getStandings";

const getStandingsEveryRound = (tournament: Tournament) => {
	return generateArray(tournament.info.rounds).map((round: number) => 
		getStandings({tournament: tournament, afterRound: round})
	)
};

export default getStandingsEveryRound;