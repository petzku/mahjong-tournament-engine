import { useSelector } from "react-redux";
import { State } from "../../../state";

import PostTabs from "../PostTabs";
import styles from "./ReportCards.module.css";
import RankingEvolution from "./RankingEvolution";
import Positions from "./Positions";
import CumulativePoints from "./CumulativePoints";
import Games from "./Games";
import Statistics from "./Statistics";

const ReportCards = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  
  const selectedPlayerId = 9;
  const playerName = tournamentState.playerNames[selectedPlayerId];

  return (
    <div>
      <PostTabs/>
      <h1>Player report cards</h1>
      <h2>Report for player {playerName}</h2>
      <div className={styles.columns}>
        <div>
          <RankingEvolution playerId={selectedPlayerId} />
          <Positions playerId={selectedPlayerId} />
          <CumulativePoints playerId={selectedPlayerId} />
        </div>
        <div className={styles.games}>
          <Games playerId={selectedPlayerId} />
        </div>
      </div>
      <div>
        <Statistics
          playerId={selectedPlayerId}
          games={tournamentState.games}
        />
      </div>
    </div>
  );
};

export default ReportCards;