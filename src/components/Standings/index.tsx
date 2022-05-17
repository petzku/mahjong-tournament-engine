import { useSelector } from "react-redux";
import { State } from "../../state";
import { Seat, Standing, PlayerName, PlayerId, Game, Score } from "../../data-types/tournament-data-types";

import { formatPoints } from "../../utils/formatPoints";

const Standings = () => {
  const tournamentState = useSelector((state: State) => state.tournament);

  const getStandings = (): Standing[] => {
    const getTotal = (score: Score): number => score.raw + score.uma + score.penalty;

    return tournamentState.playerNames.map((playerName: PlayerName, playerId: PlayerId): Standing => ({
      playerId: playerId,
      points: tournamentState.games.reduce((subTotal: number, game: Game) => {
        const playerSeat = game.participants.find((seat: Seat): boolean => seat.playerId === playerId);

        if (game.finished && playerSeat)
        {
          return subTotal + getTotal(playerSeat.score)
          /* if (game.participants.east.playerId === playerId)
          {
            return subTotal + getTotal(game.participants.east.score);
          }
          if (game.participants.south.playerId === playerId)
          {
            return subTotal + getTotal(game.participants.south.score);
          }
          if (game.participants.west.playerId === playerId)
          {
            return subTotal + getTotal(game.participants.west.score);
          }
          if (game.participants.north.playerId === playerId)
          {
            return subTotal + getTotal(game.participants.north.score);
          } */
        }
        return subTotal;
      }, 0)
    })).sort((a: Standing, b: Standing): number => (a.points < b.points) ? 1 : -1);
  };

  return (
    <table
      className={"standings"}>
      <thead>
        <tr>
          <th>Player</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          getStandings().map((standing: Standing) => (
            <tr key={`player-standing-${standing.playerId}`}>
              <td>{tournamentState.playerNames[standing.playerId]}</td>
              <td>{formatPoints(standing.points)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Standings;