import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { Standing, PlayerName, PlayerId, Game } from "../../data-types/tournament-data-types";

import { generateArray } from "../../utils/generateArray";
import TextInput from "../TextInput";

type PlayersProps = {
  east: PlayerName,
  south: PlayerName,
  west: PlayerName,
  north: PlayerName,
  hilight: string
};

const Players = (props: PlayersProps) => {
  const isHilighted = (name: PlayerName) => props.hilight.length > 0 && name.toLowerCase().indexOf(props.hilight.toLowerCase()) >= 0;
  const eastClassName = `${isHilighted(props.east) ? "hilight" : ""}`;
  const southClassName = `${isHilighted(props.south) ? "hilight" : ""}`;
  const westClassName = `${isHilighted(props.west) ? "hilight" : ""}`;
  const northClassName = `${isHilighted(props.north) ? "hilight" : ""}`;

  return (
    <table>
      <tbody>
        <tr>
          <td>East</td>
          <td className={eastClassName}>{props.east}</td>
        </tr>
        <tr>
          <td>South</td>
          <td className={southClassName}>{props.south}</td>
        </tr>
        <tr>
          <td>West</td>
          <td className={westClassName}>{props.west}</td>
        </tr>
        <tr>
          <td>North</td>
          <td className={northClassName}>{props.north}</td>
        </tr>
      </tbody>
    </table>
  );
};

const SeatingPlan = () => {
  const [hilight, setHilight] = useState<string>("");
  const tournamentState = useSelector((state: State) => state.tournament);
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
                    const game = tournamentState.games.find((game: Game) => game.round === roundId && game.table === tableId);
                    
                    return (
                      game
                      ?
                      <td key={`round-tr-${roundId}-table-td-${tableId}`}>
                        <Players
                          east={tournamentState.playerNames[game.score.east.playerId]}
                          south={tournamentState.playerNames[game.score.south.playerId]}
                          west={tournamentState.playerNames[game.score.west.playerId]}
                          north={tournamentState.playerNames[game.score.north.playerId]}
                          hilight={hilight}
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

export default SeatingPlan;