import { useMemo, useState } from "react";
import Dropdown, {DropdownItem} from "../../../../components/Dropdown";
import useTournament from "../../../../utils/hooks/useTournament";
import alphabetizer from "../../../../utils/alphabetizer";
import Performance from "../../../../components/Performance";

const IndividualPlayer = () => {
	const tournament = useTournament();
	const [selectedPlayer, setSelectedPlayer] = useState<number>(0);

	const playerOptions: DropdownItem[] = useMemo(() => [...tournament.playerNames]
		.sort(alphabetizer)
		.map((playerName: string) => ({
			text: playerName,
			value: tournament.playerNames.indexOf(playerName)
		})), []);

	return (
		<div>
			<Dropdown
				id={"individual-player-dropdown"}
				label={"See player"}
				value={selectedPlayer}
				items={playerOptions}
				onChange={(newValue) => setSelectedPlayer(newValue)}
			/>
			<Performance
				anonymize={false}
				playerId={selectedPlayer}
			/>
		</div>
	);
};

export default IndividualPlayer;