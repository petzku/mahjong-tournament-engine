import { useMemo, useState } from "react";
import Button from "../../../components/Button";
import PrintableIframe from "../../../components/PrintableIframe";
import { generateArray } from "../../../utils/generateArray";
import useTournament from "../../../utils/hooks/useTournament";
import { Routes } from "../../../utils/routeUtils";

type Player = {
	playerName: string,
	playerId: number
};

const ReportCards = () => {
	const tournament = useTournament();

	const [playerIds, setPlayerIds] = useState<number[]>([]);
	const alphabetizedPlayers: Player[] = useMemo(() => tournament.playerNames.map((playerName: string, playerId: number): Player => ({
		playerName: playerName,
		playerId: playerId
	})).sort((a: Player, b: Player) => a.playerName > b.playerName ? 1 : -1), [])

	const togglePlayer = (toggledPlayerId: number) => {
		if (playerIds.some((playerId: number) => playerId === toggledPlayerId))
		{
			setPlayerIds(playerIds.filter((playerId: number) => playerId !== toggledPlayerId));
			return;
		}
		setPlayerIds([...playerIds, toggledPlayerId].sort((a: number, b: number) => a-b));
	};

	return (
		<div>
			<h2>Player report cards</h2>
			<p>You can print or export to PDF (requires a print-to-PDF thingy) sheets that have graphs of players' performance.</p>

			<p>Select players whose report cards you want to print.</p>
			<Button
				label={"Select all"}
				onClick={() => setPlayerIds(generateArray(tournament.playerNames.length))}
			/>
			<Button
				label={"Deselect all"}
				onClick={() => setPlayerIds([])}
			/>
			{
				alphabetizedPlayers.map((player: Player) => (
					<div key={`player-${player.playerId}`}>
						<input
							type={"checkbox"}
							name={"players"}
							id={player.playerId.toString()}
							checked={playerIds.some((playerId: number) => playerId === player.playerId)}
							onChange={(e) => togglePlayer(+e.target.id)}
						/>
						<label htmlFor={player.playerId.toString()}>
							{player.playerName}
						</label>
					</div>
				))
			}
			<PrintableIframe
				label={"Print"}
				id={"reportcards"}
				src={`${Routes.PrintReportCards}?players=${playerIds.join(",")}`}
			/>
		</div>
	);
};

export default ReportCards;