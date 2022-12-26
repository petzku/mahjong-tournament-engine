import { Standing, Tournament } from "../../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../../utils/formatPoints";
import Comparison from "./Comparison";
import styles from "./Row.module.css";

type RowProps = {
	standing: Standing,
	rank: number,
	tournament: Tournament
	comparison: number
};

const Row = (props: RowProps) => {
	const playerName = props.tournament.playerNames[props.standing.playerId];
	const points = formatPoints({points: props.standing.points, sign: true});

	return (
		<tr key={`player-standing-${props.standing.playerId}`}>
			<td className={styles.cell}>{props.rank}.</td>
			<td className={styles.cell}>{playerName}</td>
			<td className={styles.cell}>{points}</td>
			{
				props.comparison !== 0
				?
				<Comparison change={props.comparison}/>
				:
				<td>{null}</td>
			}
		</tr>
	);
};

export default Row;