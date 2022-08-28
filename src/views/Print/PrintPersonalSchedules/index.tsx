import { Game, PlayerId, PlayerName, Seat, Tournament } from "../../../data-types/tournament-data-types";

import styles from "./PrintPersonalSchedules.module.css";

type Placement = {
  round: number,
  table: number,
  seat: number
};

const PrintPlayerSchedules = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  const getPlacements = (player: number) =>  tournament.games.filter((game: Game): boolean => (
    game.participants.some((participant: Seat): boolean => participant.playerId === player)
  )).map((game: Game) => ({
    round: game.round,
    table: game.table,
    seat: game.participants.findIndex((participant: Seat): boolean => participant.playerId === player)
  }));

  return (
    <div className={styles.allSchedules}>
      {
        tournament.playerNames.map((playerName: PlayerName, playerId: PlayerId) => (
          <table key={`playerschedule-${playerId}`}>
            <thead>
              <tr>
                <th colSpan={3}>
                  {playerName}
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
                    <td>{placement.round + 1}</td>
                    <td>{placement.table + 1}</td>
                    <td>{["East", "South", "West", "North"][placement.seat]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ))
      }
    </div>
  );
};

export default PrintPlayerSchedules;