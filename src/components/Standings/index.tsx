import { Tournament } from "../../data-types/tournament-data-types";
import PlainText from "./PlainText";
import Table from "./Table";

type StandingsProps = {
	className?: string,
	plainText?: boolean,
	tournament: Tournament,
	afterRound: number
};

const Standings = (props: StandingsProps) => {
	if (props.plainText)
	{
		return (
			<PlainText
				className={props.className}
				tournament={props.tournament}
				afterRound={props.afterRound}
			/>
		);
	}

	return (
		<Table
			className={props.className}
			tournament={props.tournament}
			afterRound={props.afterRound}
		/>
	);
};

export default Standings;