import { useMemo } from "react";
import { generateArray } from "../../../utils/generateArray";
import styles from "./Table.module.css";
import getStandingsEveryRound from "../utils/getStandingsEveryRound";
import getComparisons from "../utils/getComparisons";
import Column from "./Column";
import useTournament from "../../../utils/hooks/useTournament";

type StandingsProps = {
	className?: string,
	afterRound: number
};

const Table = (props: StandingsProps) => {
	const tournament = useTournament();
	const playerCount = tournament.playerNames.length;

	const standingsEveryRound = useMemo(() => getStandingsEveryRound(tournament), []);

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
				generateArray(columns).map((columnIndex: number) => (
					<Column
						key={`standings-column-${columnIndex}`}
						standings={standingsEveryRound[props.afterRound]}
						columnIndex={columnIndex}
						playersPerColumn={playersPerColumn}
						comparisons={comparisons}
					/>	
				))
			}
		</div>
	);
};

export default Table;