import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import StandingsDisplay from "../../../../components/Standings";
import TextInput from "../../../../components/TextInput";
import { Tournament } from "../../../../data-types/tournament-data-types";
import styles from "./StandingsPopup.module.css";

const StandingsPopup = () => {
	const [searchParams] = useSearchParams();
	const afterRound = parseInt(searchParams.get("afterRound") as string);
	const plainText = searchParams.get("plainText") !== null && searchParams.get("plainText") === "true";
	const [message, setMessage] = useState<string>("");
	const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

	return (
		<div>
			<header className={styles.header}>Standings after round {afterRound + 1}</header>
			<div className={styles.standingsPopup}>
				<StandingsDisplay
					tournament={tournament}
					afterRound={afterRound}
					plainText={plainText}
				/>
			</div>
			<footer className={styles.note}>
				<TextInput
					className={styles.popupMessage}
					value={message}
					onChange={(newMessage) => setMessage(newMessage)}
				/>
			</footer>
		</div>
	);
};

export default StandingsPopup;