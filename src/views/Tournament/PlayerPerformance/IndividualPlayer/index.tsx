import { useMemo, useState } from "react";
import SelectionList, {SelectionListItem} from "../../../../components/SelectionList";
import useTournament from "../../../../utils/hooks/useTournament";
import alphabetizer from "../../../../utils/alphabetizer";
import Performance from "../../../../components/Performance";
import styles from "./IndividualPlayer.module.css";

const IndividualPlayer = () => {
	const tournament = useTournament();
	const [selectedPlayer, setSelectedPlayer] = useState<number>(0);

	const playerOptions: SelectionListItem[] = useMemo(() => [...tournament.playerNames]
		.sort(alphabetizer)
		.map((playerName: string) => ({
			text: playerName,
			value: tournament.playerNames.indexOf(playerName)
		})), []);

	return (
		<div className={styles.individualPlayer}>
			<SelectionList
				id={"individual-player"}
				label={"See player"}
				value={selectedPlayer}
				items={playerOptions}
				onChange={(newValue: number) => setSelectedPlayer(newValue)}
			/>
			<Performance
				anonymize={false}
				playerId={selectedPlayer}
			/>
		</div>
	);
};

export default IndividualPlayer;