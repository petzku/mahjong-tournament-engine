import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { PlayerName, Game } from "../../data-types/tournament-data-types";

import TextInput from "../TextInput";

import { generateArray } from "../../utils/generateArray";

import "./EditableSeatingPlan.scss";

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

type EditableSeatingPlanProps = {
  games: Game[],
  onSave: (newGames: Game[]) => void
};

const EditableSeatingPlan = (props: EditableSeatingPlanProps) => {
  const [hilight, setHilight] = useState<string>("");
  const [selection, setSelection] = useState<[Selection, Selection]>([emptySelection, emptySelection]);
  const [alteredGames, setAlteredGames] = useState<Game[]>(props.games);

  const tournamentState = useSelector((state: State) => state.tournament);
  
  const rounds = generateArray(tournamentState.info.rounds);
  const tables = generateArray(tournamentState.playerNames.length/4);

  const twoPlayersSelected = selection[0].round + selection[0].table + selection[0].seat !== -3 && selection[1].round + selection[1].table + selection[1].seat !== -3;

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

  const alterGames = () => {
    /* if (selection[0].round === selection[1].round && selection[0].table === selection[1].table)
    {
      setAlteredGames(alteredGames.map((game: Game): Game => {
        //If the swap is done within a game.
        if (game.round === selection[0].round && game.table === selection[1].table)
        {
          const oldPlayerIds = [game.participants[0].playerId, game.participants[1].playerId, game.participants[2].playerId, game.participants[3].playerId];
          const newPlayerIds = [
            selection[0].seat === 0 ? 
          ];
          const newGame: Game = {
            round: game.round,
            table: game.table,
            finished: false,
            participants: [

            ]
          }
        }

        //If there's no swap
        return game;
      }));
    } */
  };

  return (
    <div>
      <TextInput
        label={"Hilight"}
        value={hilight}
        onChange={(newValue: string): void => setHilight(newValue)}
      />
      <p>
        Select two players and:&nbsp;&nbsp;
        <button
          disabled={!twoPlayersSelected}
          onClick={() => alterGames()}>
          Swap selected players
        </button>
      </p>
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
                          east={tournamentState.playerNames[game.participants[0].playerId]}
                          south={tournamentState.playerNames[game.participants[1].playerId]}
                          west={tournamentState.playerNames[game.participants[2].playerId]}
                          north={tournamentState.playerNames[game.participants[3].playerId]}
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
      <button
        onClick={() => props.onSave(props.games)}>
        Seating plan OK.
      </button>
      <button>
        Revert to original.
      </button>
    </div>
  );
};

export default EditableSeatingPlan;