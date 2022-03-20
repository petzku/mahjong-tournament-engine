import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../data-types/app-data-types";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import { PlayerName, PlayerId, Game, Standing } from "../../data-types/tournament-data-types";

const InTournamentView = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  //const {addTables} = bindActionCreators(tournamentActionCreators, dispatch);

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
    <div className={"in-tournament"}>
      <div className={"controls"}>
        <button>Add finished game</button>
        <button>Edit players</button>
        <button>Edit tables</button>
      </div>
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
              <tr>
                <td>{tournamentState.playerNames[standing.playerId]}</td>
                <td>{standing.points}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};

export default InTournamentView;