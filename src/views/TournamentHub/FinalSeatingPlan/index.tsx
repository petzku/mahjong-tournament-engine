import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../state";
import { Game } from "../../../data-types/tournament-data-types";

import TextInput from "../../../components/TextInput";
import Hanchan from "./Hanchan";

import { generateArray } from "../../../utils/generateArray";

const FinalSeatingPlan = () => {
  const [hilight, setHilight] = useState<string>("");

  const tournamentState = useSelector((state: State) => state.tournament);

  const openResultsPopup = (round: number, table: number) => {
    console.log(`open results popup for round ${round} table ${table}`);
  };

  const rounds = generateArray(tournamentState.info.rounds);
  const tables = generateArray(tournamentState.playerNames.length/4);

  return (
    <div>
      <TextInput
        label={"Hilight"}
        value={hilight}
        onChange={(newValue: string): void => setHilight(newValue)}
      />
      <table>
        <tbody>
          <tr>
            <th>Round\Table</th>
            {
              tables.map((tableId: number) => <th key={`table-th-${tableId}`}>{`Table ${tableId+1}`}</th>)
            }
          </tr>
          {
            rounds.map((roundId: number) => (
              <tr key={`round-tr-${roundId}`}>
                <th>
                  {`Round ${roundId+1}`}
                </th>
                {
                  tables.map((tableId: number) => {
                    const game = tournamentState.games.find((game: Game): boolean => game.round === roundId && game.table === tableId);

                    return (
                      game
                      ?
                      <td key={`round-tr-${roundId}-table-td-${tableId}`}>
                        <Hanchan
                          east={tournamentState.playerNames[game.participants[0].playerId]}
                          south={tournamentState.playerNames[game.participants[1].playerId]}
                          west={tournamentState.playerNames[game.participants[2].playerId]}
                          north={tournamentState.playerNames[game.participants[3].playerId]}
                          hilight={hilight}
                          onClick={() => openResultsPopup(roundId, tableId)}
                        />
                      </td>
                      :
                      <td>Game undefined</td>
                    );
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default FinalSeatingPlan;