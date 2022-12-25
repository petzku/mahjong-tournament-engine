import { useMemo } from "react";
import { Standing, Tournament } from "../../data-types/tournament-data-types";
import { formatPoints } from "../../utils/formatPoints";
import { generateArray } from "../../utils/generateArray";
import { getStandings } from "../../utils/getStandings";
import Comparison from "../Comparison";
import styles from "./StandingsTable.module.css";

type StandingsProps = {
	className?: string,
	split?: boolean,
	plainText?: boolean,
	tournament: Tournament,
	afterRound: number
};

const StandingsTable = (props: StandingsProps) => {
	const playerCount = props.tournament.playerNames.length;

	const everyRound = useMemo(() => generateArray(props.tournament.info.rounds).map((round: number) => 
		getStandings({tournament: props.tournament, afterRound: round})
	), []);

	const comparisons = generateArray(playerCount).map((playerId: number) => {
		if (props.afterRound === 0)
		{
			return 0;
		}

		const previousPlacement = everyRound[props.afterRound - 1].findIndex((standing: Standing) => standing.playerId === playerId);
		const currentPlacement = everyRound[props.afterRound].findIndex((standing: Standing) => standing.playerId === playerId);
		return previousPlacement - currentPlacement;
	});

	const columnSplitLimit = 24;
	const playersPerColumn = 16;
	const columns = playerCount >= columnSplitLimit ? Math.ceil(playerCount/playersPerColumn) : 1;

	if (props.plainText)
	{
		return (
			<div>
				<pre>
					{
						everyRound[props.tournament.info.rounds - 1].map((standing: Standing, rank: number) => (
							`${rank + 1}.\t${props.tournament.playerNames[standing.playerId]}\t${formatPoints({points: standing.points, sign: true})}\n`
						))
					}
				</pre>
			</div>
		);
	}

	return (
		<div className={styles.standings}>
			{
				generateArray(columns).map((columnId: number) => (
					<table
						key={`standings-column-${columnId}`}
						className={styles.standingsTable}>
						<thead>
							<tr>
								<th>Pos.</th>
								<th>Player</th>
								<th>Total</th>
								<th>{null}</th>
							</tr>
							</thead>
						<tbody>
						{
							everyRound[props.afterRound]
								.filter((_: Standing, rank: number) => columnId*playersPerColumn <= rank && rank < columnId*playersPerColumn+playersPerColumn)
								.map((standing: Standing, rank: number) => (
								<tr key={`player-standing-${standing.playerId}`}>
									<td className={styles.cell}>{columnId*playersPerColumn + rank + 1}.</td>
									<td className={styles.cell}>{props.tournament.playerNames[standing.playerId]}</td>
									<td className={styles.cell}>{formatPoints({points: standing.points, sign: true})}</td>
									{
										comparisons[standing.playerId] !== 0
										?
										<Comparison change={comparisons[standing.playerId]}/>
										:
										<td>{null}</td>
									}
								</tr>
							))
						}
						</tbody>
					</table>
				))
			}
		</div>
	);
};

export default StandingsTable;