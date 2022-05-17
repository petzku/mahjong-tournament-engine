import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { Standing, PlayerName, PlayerId, Game, Participants } from "../../data-types/tournament-data-types";

import TextInput from "../TextInput";

import { generateArray } from "../../utils/generateArray";

import "./FinalSeatingPlan.scss";

type PlayersProps = {
  east: PlayerName,
  south: PlayerName,
  west: PlayerName,
  north: PlayerName,
  hilight: string
};

const Players = (props: PlayersProps) => {
  const isHilighted = (name: PlayerName) => props.hilight.length > 0 && name.toLowerCase().indexOf(props.hilight.toLowerCase()) >= 0;

  const eastHilight = isHilighted(props.east) ? "hilight" : "";
  const southHilight = isHilighted(props.south) ? "hilight" : "";
  const westHilight = isHilighted(props.west) ? "hilight" : "";
  const northHilight = isHilighted(props.north) ? "hilight" : "";

  const eastClassName = `player ${eastHilight}`;
  const southClassName = `player ${southHilight}`;
  const westClassName = `player ${westHilight}`;
  const northClassName = `player ${northHilight}`;

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

const FinalSeatingPlan = () => {
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
                    const game = tournamentState.games.find((game: Game): boolean => game.round === roundId && game.table === tableId);

                    return (
                      game
                      ?
                      <td key={`round-tr-${roundId}-table-td-${tableId}`}>
                        <Players
                          east={tournamentState.playerNames[game.participants[0].playerId]}
                          south={tournamentState.playerNames[game.participants[1].playerId]}
                          west={tournamentState.playerNames[game.participants[2].playerId]}
                          north={tournamentState.playerNames[game.participants[3].playerId]}
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

export default FinalSeatingPlan;