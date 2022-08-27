import { useSelector } from "react-redux";
import { State } from "../../../state";

import PostTabs from "../PostTabs";
import styles from "./ReportCards.module.css";
import RankingEvolution from "./RankingEvolution";
import Positions from "./Positions";
import CumulativePoints from "./CumulativePoints";

const ReportCards = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  
  const selectedPlayerId = 0;
  const playerName = tournamentState.playerNames[selectedPlayerId];

  //TODO:
  //- highest and lowest single
  //- mean and distribution
  //- list of all the player's hanchans and points

  return (
    <div>
      <PostTabs/>
      <h1>Player report cards</h1>
      <h2>Report for player {playerName}</h2>
      <RankingEvolution playerId={selectedPlayerId} />
      <Positions playerId={selectedPlayerId} />
      <CumulativePoints playerId={selectedPlayerId} />
    </div>
  );
};

export default ReportCards;