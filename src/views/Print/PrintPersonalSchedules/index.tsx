import { Game, Seat, Tournament } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";

import styles from "./PrintPersonalSchedules.module.css";

type Placement = {
  round: number,
  table: number,
  seat: number
};

const PrintPlayerSchedules = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  const getPlacements = (playerId: number) => tournament.games.filter((game: Game): boolean => (
    game.participants.some((participant: Seat): boolean => participant.playerId === playerId)
  )).map((game: Game) => ({
    round: game.round,
    table: game.table,
    seat: game.participants.findIndex((participant: Seat): boolean => participant.playerId === playerId)
  }));

  return (
    <div>
      {
        generateArray(Math.ceil(tournament.playerNames.length/9)).map((page: number) => (
          <div
            key={`page-${page}`}
            className={styles.page}>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((unit: number) => {
                const playerId = page*9 + unit;

                return playerId >= tournament.playerNames.length ? null : (
                  <table className={styles.schedule} key={`playerschedule-${playerId}`}>
                    <thead>
                      <tr>
                        <th colSpan={3}>
                          {tournament.playerNames[playerId]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Round</th>
                        <th>Table</th>
                        <th>Seat</th>
                      </tr>
                      {
                        getPlacements(playerId).map((placement: Placement) => (
                          <tr key={`player-${playerId}-placemet-${placement.round}`}>
                            <td className={styles.cell}>{placement.round + 1}</td>
                            <td className={styles.cell}>{placement.table + 1}</td>
                            <td className={styles.cell}>{["East", "South", "West", "North"][placement.seat]}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                );
              })
            }
          </div>
        ))
      }
    </div>
  );
};

export default PrintPlayerSchedules;