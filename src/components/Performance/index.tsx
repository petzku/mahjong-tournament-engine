import CumulativePoints from "./CumulativePoints";
import Games from "./Games";
import Positions from "./Positions";
import RankingEvolution from "./RankingEvolution";
import Statistics from "./Statistics";
import styles from "./Performance.module.css";

type PerformanceProps = {
	playerId: number,
	anonymize: boolean
};

const Performance = (props: PerformanceProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.columns}>
				<div>
					<RankingEvolution
						playerId={props.playerId}
					/>
					<Positions
						playerId={props.playerId}
					/>
					<CumulativePoints
						playerId={props.playerId}
					/>
				</div>
				<div className={styles.games}>
					<Games
						anonymize={props.anonymize}
						playerId={props.playerId}
					/>
				</div>
			</div>
			<div>
				<Statistics
					playerId={props.playerId}
				/>
			</div>
		</div>
	);
};

export default Performance;