import { useState } from "react";
import Toggle from "../../../components/Toggle";
import IndividualPlayer from "./IndividualPlayer";
import ReportCards from "./ReportCards";

const PlayerPerformance = () => {
	const [individualPlayer, setIndividualPlayer] = useState<boolean>(true);

	return (
		<div>
			<Toggle
				true={"See individual player"}
				false={"Print performance cards"}
				value={individualPlayer}
				onSwitch={() => setIndividualPlayer(!individualPlayer)}
			/>
			{
				individualPlayer
				?
				<IndividualPlayer/>
				:
				<ReportCards/>
			}
		</div>
	);
}

export default PlayerPerformance;