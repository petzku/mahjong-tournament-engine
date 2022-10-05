import { Standing, Tournament } from "../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../utils/formatPoints";
import { getStandings } from "../../../../utils/getStandings";
import styles from "./StandingsPopup.module.css";

const StandingsPopup = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  return (
    <div>
      <table
        className={styles.standingsPopup}>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Player</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            getStandings({tournament: tournament, atRound: tournament.info.rounds}).map((standing: Standing, index: number) => (
              <tr key={`player-standing-${standing.playerId}`}>
                <td className={styles.cell}>{index + 1}.</td>
                <td className={styles.cell}>{tournament.playerNames[standing.playerId]}</td>
                <td className={styles.cell}>{formatPoints({points: standing.points, sign: true})}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default StandingsPopup;