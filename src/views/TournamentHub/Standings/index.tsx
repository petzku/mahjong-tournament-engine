import { useSelector } from "react-redux";
import { State } from "../../../state";
import { Standing } from "../../../data-types/tournament-data-types";

import { formatPoints } from "../../../utils/formatPoints";
import { getStandings } from "../../../utils/getStandings";

const Standings = () => {
  const tournamentState = useSelector((state: State) => state.tournament);

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
          getStandings(tournamentState).map((standing: Standing) => (
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