import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../state";
import { Standing } from "../../../data-types/tournament-data-types";

import { formatPoints } from "../../../utils/formatPoints";
import { getStandings } from "../../../utils/getStandings";
import HubTabs from "../HubTabs";

const Standings = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  const [standingsWindow, setStandingsWindow] = useState<WindowProxy | null>(null);

  const openWindow = () => {
    setStandingsWindow(window.open(
      "/hub/standings/popup",
      "standingsWindow",
      "width=500,height=500"
    ));
  };

  return (
    <div>
      <HubTabs/>
      <button onClick={() => openWindow()}>Open in popup.</button>
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
            getStandings({tournament: tournamentState, atRound: tournamentState.info.rounds}).map((standing: Standing) => (
              <tr key={`player-standing-${standing.playerId}`}>
                <td>{tournamentState.playerNames[standing.playerId]}</td>
                <td>{formatPoints({points: standing.points, sign: true})}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Standings;