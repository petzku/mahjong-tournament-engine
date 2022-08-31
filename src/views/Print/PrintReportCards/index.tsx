import styles from "./PrintReportCards.module.css";
import RankingEvolution from "./RankingEvolution";
import Positions from "./Positions";
import CumulativePoints from "./CumulativePoints";
import Games from "./Games";
import Statistics from "./Statistics";
import { Tournament } from "../../../data-types/tournament-data-types";
import { useSearchParams } from "react-router-dom";

type Player = {
  playerId: number,
  playerName: string
};

const PrintReportCards = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const playerIdsParam = searchParams.get("players");
  const players: Player[] = playerIdsParam !== null ? playerIdsParam.split(",").map((playerId: string) => ({
    playerId: +playerId,
    playerName: tournament.playerNames[+playerId]
  })) : [{
    playerId: 0,
    playerName: tournament.playerNames[0]
  }];

  return (
    <div>
      {
        players.map((player: Player) => (
          <div className={styles.card} key={`reportcard-${player.playerId}`}>
            <h1 className={styles.title}>{tournament.info.title}</h1>
            <h2 className={styles.title}>Report card for player {player.playerName}</h2>
            <p className={styles.subtitle}>Created with mahjong-tournament-engine 0.1 by Pauli Marttinen</p>
            <div className={styles.columns}>
              <div>
                <RankingEvolution
                  tournament={tournament}
                  playerId={player.playerId}
                />
                <Positions
                  tournament={tournament}
                  playerId={player.playerId}
                />
                <CumulativePoints
                  tournament={tournament}
                  playerId={player.playerId}
                />
              </div>
              <div className={styles.games}>
                <Games
                  tournament={tournament}
                  playerId={player.playerId}
                />
              </div>
            </div>
            <div>
              <Statistics
                playerId={player.playerId}
                games={tournament.games}
              />
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PrintReportCards;