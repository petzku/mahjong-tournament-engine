import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import { generateArray } from "../../../utils/generateArray";
import { tournamentActionCreators, State } from "./../../../state";
import { Game, PlayerName } from "../../../data-types/tournament-data-types";

const AddFinishedGame = () => {
  const [round, setRound] = useState<number>(0);
  const [table, setTable] = useState<number>(0);
  const tournamentState = useSelector((state: State) => state.tournament);

  const getPlayerName = (playerId: number): PlayerName => tournamentState.playerNames[playerId];

  const roundSelectionItems: DropdownItem[] = generateArray(tournamentState.info.rounds).map((roundId: number): DropdownItem => ({
    value: roundId,
    text: `Round ${roundId + 1}`
  }));

  const tableSelectionItems: DropdownItem[] = generateArray(tournamentState.playerNames.length/4).map((tableId: number): DropdownItem => ({
    value: tableId,
    text: `Table ${tableId + 1}`
  }));

  const selectedGame = tournamentState.games.find((game: Game): boolean => (game.round === round && game.table === table));

  return (
    <div>
      <h1>Add Finished Game</h1>
      <Dropdown
        label={"Round"}
        items={roundSelectionItems}
        value={round}
        onChange={(newRound: number): void => setRound(newRound)}
      />
      <Dropdown
        label={"Table"}
        items={tableSelectionItems}
        value={table}
        onChange={(newTable: number): void => setTable(newTable)}
      />
      {
        selectedGame && !selectedGame.finished &&
        <table>
          <tbody>
            <tr>
              <th colSpan={2}>Player</th>
              <th>Points before uma</th>
              <th>Chombo</th>
              <th>Uma</th>
              <th>Final</th>
            </tr>
            <tr>
              <td>East</td>
              <td>{getPlayerName(selectedGame?.score.east.playerId)}</td>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>South</td>
              <td>{getPlayerName(selectedGame?.score.south.playerId)}</td>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>West</td>
              <td>{getPlayerName(selectedGame?.score.west.playerId)}</td>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>North</td>
              <td>{getPlayerName(selectedGame?.score.north.playerId)}</td>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
          </tbody>
        </table>
      }
      {
        selectedGame && selectedGame.finished &&
        <p>This particular game has already been flagged as finished.</p>
      }
      {
        !selectedGame &&
        <p>This particular game is missing from tournament data for some reason.</p>
      }
    </div>
  );
};

export default AddFinishedGame;