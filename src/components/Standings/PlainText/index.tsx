import { useMemo } from "react";
import { Standing } from "../../../data-types/tournament-data-types";
import { formatPoints } from "../../../utils/formatPoints";
import useTournament from "../../../utils/hooks/useTournament";
import getStandingsEveryRound from "../utils/getStandingsEveryRound";

type StandingsProps = {
	className?: string,
	afterRound: number
};

const PlainText = (props: StandingsProps) => {
	const tournament = useTournament();
	const standingsEveryRound = useMemo(() => getStandingsEveryRound(tournament), []);

	return (
		<div>
			<pre>
				{
					standingsEveryRound[tournament.info.rounds - 1].map((standing: Standing, rank: number) => (
						`${rank + 1}.\t${tournament.playerNames[standing.playerId]}\t${formatPoints({points: standing.points, sign: true})}\n`
					))
				}
			</pre>
		</div>
	);
};

export default PlainText;