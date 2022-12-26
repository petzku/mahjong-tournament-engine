import { useMemo } from "react";
import { Standing, Tournament } from "../../../data-types/tournament-data-types";
import { formatPoints } from "../../../utils/formatPoints";
import { generateArray } from "../../../utils/generateArray";
import Comparison from "../../Comparison";
import styles from "./Table.module.css";
import getStandingsEveryRound from "../utils/getStandingsEveryRound";
import getComparisons from "../utils/getComparisons";

type StandingsProps = {
	className?: string,
	tournament: Tournament,
	afterRound: number
};

const Table = (props: StandingsProps) => {
	const playerCount = props.tournament.playerNames.length;

	const standingsEveryRound = useMemo(() => getStandingsEveryRound(props.tournament), []);

	const comparisons = getComparisons({
		standings: standingsEveryRound,
		afterRound: props.afterRound,
		playerCount: playerCount
	});

	const columnSplitLimit = 24;
	const playersPerColumn = 16;
	const columns =
		playerCount >= columnSplitLimit
		?
		Math.ceil(playerCount/playersPerColumn)
		:
		1;

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
							standingsEveryRound[props.afterRound]
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

export default Table;