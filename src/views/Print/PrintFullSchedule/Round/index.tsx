import WindRow from "./WindRow";
import { Game } from "../../../../data-types/tournament-data-types";
import styles from "./Round.module.css";

type RoundProps = {
	roundId: number,
	games: Game[],
	playerNames: string[]
};

const Round = (props: RoundProps) => {
	return (
		<tbody className={styles.round}>
			<tr>
				<th rowSpan={4}>
					Round {props.roundId + 1}
				</th>
				<WindRow
					windId={0}
					games={props.games}
					playerNames={props.playerNames}
				/>
			</tr>
			<tr>
				<WindRow
					windId={1}
					games={props.games}
					playerNames={props.playerNames}
					/>
			</tr>
			<tr>
				<WindRow
					windId={2}
					games={props.games}
					playerNames={props.playerNames}
				/>
			</tr>
			<tr>
				<WindRow
					windId={3}
					games={props.games}
					playerNames={props.playerNames}
				/>
			</tr>
		</tbody>
	);
};

export default Round;