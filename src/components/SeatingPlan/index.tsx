import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { Standing, PlayerName, PlayerId, Game } from "../../data-types/tournament-data-types";

import { generateArray } from "../../utils/generateArray";
import TextInput from "../TextInput";

import "./SeatingPlan.scss";

type PlayersProps = {
  east: PlayerName,
  south: PlayerName,
  west: PlayerName,
  north: PlayerName,
  hilight: string,
  selected: [number, number],
  onSelect: (seatId: number) => void
};

const Players = (props: PlayersProps) => {
  const isHilighted = (name: PlayerName) => props.hilight.length > 0 && name.toLowerCase().indexOf(props.hilight.toLowerCase()) >= 0;
  const isSelected = (seatId: number) => props.selected[0] === seatId || props.selected[1] === seatId;

  const eastHilight = isHilighted(props.east) ? "hilight" : "";
  const southHilight = isHilighted(props.south) ? "hilight" : "";
  const westHilight = isHilighted(props.west) ? "hilight" : "";
  const northHilight = isHilighted(props.north) ? "hilight" : "";

  const eastSelected = isSelected(0) ? "selected" : "";
  const southSelected = isSelected(1) ? "selected" : "";
  const westSelected = isSelected(2) ? "selected" : "";
  const northSelected = isSelected(3) ? "selected" : "";

  const eastClassName = `player ${eastHilight} ${eastSelected}`;
  const southClassName = `player ${southHilight} ${southSelected}`;
  const westClassName = `player ${westHilight} ${westSelected}`;
  const northClassName = `player ${northHilight} ${northSelected}`;

  return (
    <table>
      <tbody>
        <tr onClick={() => props.onSelect(0)}>
          <td>East</td>
          <td className={eastClassName}>{props.east}</td>
        </tr>
        <tr onClick={() => props.onSelect(1)}>
          <td>South</td>
          <td className={southClassName}>{props.south}</td>
        </tr>
        <tr onClick={() => props.onSelect(2)}>
          <td>West</td>
          <td className={westClassName}>{props.west}</td>
        </tr>
        <tr onClick={() => props.onSelect(3)}>
          <td>North</td>
          <td className={northClassName}>{props.north}</td>
        </tr>
      </tbody>
    </table>
  );
};

type Selection = {
  round: number,
  table: number,
  seat: number
};

const emptySelection: Selection = {
  round: -1,
  table: -1,
  seat: -1
};

const SeatingPlan = () => {
  const [hilight, setHilight] = useState<string>("");
  const [selection, setSelection] = useState<[Selection, Selection]>([emptySelection, emptySelection]);
  const tournamentState = useSelector((state: State) => state.tournament);
  const rounds = generateArray(tournamentState.info.rounds);
  const tables = generateArray(tournamentState.playerNames.length/4);

  const changeSelection = (roundId: number, tableId: number, seatId: number): void => {
    //If the selected seat is already in the first selection slot, unselect it.
    if (selection[0].round === roundId && selection[0].table === tableId && selection[0].seat === seatId)
    {
      setSelection([emptySelection, selection[1]]);
      return;
    }

    //If the selected seat is already in the second selection slot, unselect it.
    if (selection[1].round === roundId && selection[1].table === tableId && selection[1].seat === seatId)
    {
      setSelection([selection[0], emptySelection]);
      return;
    }

    //If one of the selection slots is empty, put this selection to that slot.
    if (selection[0].round + selection[0].table + selection[0].seat === -3)
    {
      setSelection([{round: roundId, table: tableId, seat: seatId}, selection[1]]);
      return;
    }

    if (selection[1].round + selection[1].table + selection[1].seat === -3)
    {
      setSelection([selection[0], {round: roundId, table: tableId, seat: seatId}]);
      return;
    }

    //Otherwise, move second selection to first and add new selection to second slot.
    setSelection([selection[1], {round: roundId, table: tableId, seat: seatId}]);
  };

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
                    const selected: [number, number] = [
                      roundId === selection[0].round && tableId === selection[0].table ? selection[0].seat : -1,
                      roundId === selection[1].round && tableId === selection[1].table ? selection[1].seat : -1,
                    ];

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
                          selected={selected}
                          onSelect={(seatId: number): void => changeSelection(roundId, tableId, seatId)}
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