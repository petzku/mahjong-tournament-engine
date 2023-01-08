import { useEffect } from "react";
import Round from "./Round";
import { Game } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import { landscapeLayout } from "../../../utils/landscapeLayout";
import styles from "./PrintFullSchedule.module.css";
import useTournament from "../../../utils/hooks/useTournament";

const PrintFullSchedule = () => {
	const tournament = useTournament();

	const rounds = generateArray(tournament.info.rounds);
	const tables = generateArray(tournament.playerNames.length/4);

	useEffect(landscapeLayout, []);

	return (
		<table className={styles.fullSchedule}>
			<thead>
				<tr>
					<th colSpan={tables.length + 1}>
						{tournament.info.title}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{null}</td>
					{
						tables.map((tableId: number) => (
							<th
								key={`table-th-${tableId}`}
								colSpan={2}>
								Table {tableId + 1}
							</th>
						))
					}
				</tr>
			</tbody>
			{
				rounds.map((roundId: number) => (
					<Round
						key={`round-tr-${roundId}`}
						roundId={roundId}
						games={tournament.games.filter((game: Game) => game.round === roundId)}
						playerNames={tournament.playerNames}
					/>
				))
			}
		</table>
	);
};

export default PrintFullSchedule;