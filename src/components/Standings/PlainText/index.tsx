import { useMemo } from "react";
import { Standing, Tournament } from "../../../data-types/tournament-data-types";
import { formatPoints } from "../../../utils/formatPoints";
import getStandingsEveryRound from "../utils/getStandingsEveryRound";

type StandingsProps = {
	className?: string,
	tournament: Tournament,
	afterRound: number
};

const PlainText = (props: StandingsProps) => {
	const standingsEveryRound = useMemo(() => getStandingsEveryRound(props.tournament), []);

	return (
		<div>
			<pre>
				{
					standingsEveryRound[props.tournament.info.rounds - 1].map((standing: Standing, rank: number) => (
						`${rank + 1}.\t${props.tournament.playerNames[standing.playerId]}\t${formatPoints({points: standing.points, sign: true})}\n`
					))
				}
			</pre>
		</div>
	);
};

export default PlainText;