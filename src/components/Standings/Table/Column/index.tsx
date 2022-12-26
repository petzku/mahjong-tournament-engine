import { Standing, Tournament } from "../../../../data-types/tournament-data-types";
import styles from "./Column.module.css";
import Row from "./Row/Row";

type ColumnProps = {
	standings: Standing[],
	tournament: Tournament,
	columnIndex: number,
	playersPerColumn: number,
	comparisons: number[]
};

const Column = (props: ColumnProps) => {
	const rangeMin = props.columnIndex*props.playersPerColumn;
	const rangeMax = props.columnIndex*props.playersPerColumn+props.playersPerColumn;
	const standings = props.standings
		.filter((_: Standing, rank: number) => rangeMin <= rank && rank < rangeMax);

	return (
		<table
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
				standings
					.map((standing: Standing, rank: number) => (
						<Row
							standing={standing}
							rank={rangeMin + rank + 1}
							tournament={props.tournament}
							comparison={props.comparisons[standing.playerId]}
						/>
				))
			}
			</tbody>
		</table>
	);
};

export default Column;