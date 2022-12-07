import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../state";
import { Standing } from "../../../data-types/tournament-data-types";

import { formatPoints } from "../../../utils/formatPoints";
import { getStandings } from "../../../utils/getStandings";
import HubTabs from "../HubTabs";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import Comparison from "../../../components/Comparison";
import { generateArray } from "../../../utils/generateArray";

const Standings = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  const [afterRound, setAfterRound] = useState<number>(tournamentState.info.rounds - 1);
  const [standingsWindow, setStandingsWindow] = useState<WindowProxy | null>(null);

  const openWindow = () => {
    setStandingsWindow(window.open(
      `/hub/standings/popup?afterRound=${afterRound}`,
      "standingsWindow",
      "width=500,height=500"
    ));
  };

  const roundOptions = generateArray(tournamentState.info.rounds).map((roundId: number): DropdownItem => ({
    value: roundId,
    text: `Round ${roundId + 1}`
  }));

  const everyRound = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number) => (
    getStandings({tournament: tournamentState, atRound: round})
  )), []);

  const comparisons = generateArray(tournamentState.playerNames.length).map((playerId: number) => {
    if (afterRound === 0)
    {
      return 0;
    }

    const previousPlacement = everyRound[afterRound - 1].findIndex((standing: Standing) => standing.playerId === playerId);
    const currentPlacement = everyRound[afterRound].findIndex((standing: Standing) => standing.playerId === playerId);
    return previousPlacement - currentPlacement;
  });

  return (
    <div>
      <HubTabs/>
      <Dropdown
        label={"Show standings after round"}
        items={roundOptions}
        value={afterRound}
        onChange={(newValue) => setAfterRound(newValue)}
      />
      <button onClick={() => openWindow()}>Open in popup.</button>
      <table
        className={"standings"}>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Player</th>
            <th>Total</th>
            <th>{null}</th>
          </tr>
        </thead>
        <tbody>
          {
            everyRound[afterRound].map((standing: Standing, position: number) => (
              <tr key={`player-standing-${standing.playerId}`}>
                <td>{position + 1}.</td>
                <td>{tournamentState.playerNames[standing.playerId]}</td>
                <td>{formatPoints({points: standing.points, sign: true})}</td>
                {
                  comparisons[standing.playerId] !== 0
                  ?
                  <Comparison change={comparisons[standing.playerId]}/>
                  :
                  <td>{null}</td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Standings;