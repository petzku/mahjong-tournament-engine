import { useSelector } from "react-redux";
import { State } from "../../state";
import { Standing, PlayerName, PlayerId, Game } from "../../data-types/tournament-data-types";

const Standings = () => {
  const tournamentState = useSelector((state: State) => state.tournament);

  const getStandings = (): Standing[] => {
    return tournamentState.playerNames.map((playerName: PlayerName, playerId: PlayerId): Standing => ({
      playerId: playerId,
      points: tournamentState.games.reduce((subTotal: number, game: Game) => {
        if (game.finished)
        {
          if (game.score.east.playerId === playerId)
          {
            return subTotal + game.score.east.points;
          }
          if (game.score.south.playerId === playerId)
          {
            return subTotal + game.score.south.points;
          }
          if (game.score.west.playerId === playerId)
          {
            return subTotal + game.score.west.points;
          }
          if (game.score.north.playerId === playerId)
          {
            return subTotal + game.score.north.points;
          }
        }
        return subTotal;
      }, 0)
    })).sort((a: Standing, b: Standing): number => (a.points > b.points) ? 1 : -1);
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
              <td>{standing.points}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Standings;