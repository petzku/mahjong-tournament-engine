import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import NumberInput from "../../../components/NumberInput";
import { generateArray } from "../../../utils/generateArray";
import { tournamentActionCreators, State } from "./../../../state";
import { Game, PlayerName } from "../../../data-types/tournament-data-types";
import ManualNumberInput from "../../../components/ManualNumberInput";

type AddFinishedGameProps = {
  onFinish: Function
};

const AddFinishedGame = (props: AddFinishedGameProps) => {
  const [round, setRound] = useState<number>(0);
  const [table, setTable] = useState<number>(0);
  const [score, setScore] = useState<[string, string, string, string]>(["0", "0", "0", "0"]);
  const [chombo, setChombo] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  const [uma, setUma] = useState<[string, string, string, string]>(["0", "0", "0", "0"]);

  const dispatch = useDispatch();
  const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);
  const tournamentState = useSelector((state: State) => state.tournament);

  const getPlayerName = (playerId: number): PlayerName => tournamentState.playerNames[playerId];

  const getSum = (): number => {
    return ((+score[0]*10)+(+score[1]*10)+(+score[2]*10)+(+score[3]*10))/10;
  };

  const getFinalForPlayer = (seatId: number): number => {
    return (+score[seatId])+(+uma[seatId])+(chombo[seatId]);
  };

  const roundSelectionItems: DropdownItem[] = generateArray(tournamentState.info.rounds).map((roundId: number): DropdownItem => ({
    value: roundId,
    text: `Round ${roundId + 1}`
  }));

  const tableSelectionItems: DropdownItem[] = generateArray(tournamentState.playerNames.length/4).map((tableId: number): DropdownItem => ({
    value: tableId,
    text: `Table ${tableId + 1}`
  }));

  const selectedGame = tournamentState.games.find((game: Game): boolean => (game.round === round && game.table === table));

  const storeGame = () => {
    if (selectedGame)
    {
      const gameData: Game = {
        round: round,
        table: table,
        finished: true,
        score: {
          east: {
            playerId: selectedGame.score.east.playerId,
            points: getFinalForPlayer(0)
          },
          south: {
            playerId: selectedGame.score.south.playerId,
            points: getFinalForPlayer(1)
          },
          west: {
            playerId: selectedGame.score.west.playerId,
            points: getFinalForPlayer(2)
          },
          north: {
            playerId: selectedGame.score.north.playerId,
            points: getFinalForPlayer(3)
          }
        }
      };

      const updatedGames = tournamentState.games.map((game: Game) => (
        game.round === round && game.table === table ? gameData : game
      ));

      addGames(updatedGames);

      props.onFinish();
    }
  };

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
        <div>
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>Player</th>
                <th>Raw points</th>
                <th>Uma</th>
                <th>Chombo</th>
                <th>Final</th>
              </tr>
              <tr>
                <td>East</td>
                <td>{getPlayerName(selectedGame?.score.east.playerId)}</td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={score[0]}
                    onChange={(newScore: string): void => setScore([newScore, score[1], score[2], score[3]])}
                    tabIndex={1}
                  />
                </td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={uma[0]}
                    onChange={(newUma: string): void => setUma([newUma, uma[1], uma[2], uma[3]])}
                    tabIndex={5}
                  />
                </td>
                <td>
                  <NumberInput
                    label={""}
                    value={chombo[0]}
                    onChange={(newChombo: number): void => setChombo([newChombo, chombo[1], chombo[2], chombo[3]])}
                    steps={[20]}
                  />
                </td>
                <td>{getFinalForPlayer(0)}</td>
              </tr>
              <tr>
                <td>South</td>
                <td>{getPlayerName(selectedGame?.score.south.playerId)}</td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={score[1]}
                    onChange={(newScore: string): void => setScore([score[0], newScore, score[2], score[3]])}
                    tabIndex={2}
                  />
                </td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={uma[1]}
                    onChange={(newUma: string): void => setUma([uma[0], newUma, uma[2], uma[3]])}
                    tabIndex={6}
                  />
                </td>
                <td>
                  <NumberInput
                    label={""}
                    value={chombo[1]}
                    onChange={(newChombo: number): void => setChombo([chombo[0], newChombo, chombo[2], chombo[3]])}
                    steps={[20]}
                  />
                </td>
                <td>{getFinalForPlayer(1)}</td>
              </tr>
              <tr>
                <td>West</td>
                <td>{getPlayerName(selectedGame?.score.west.playerId)}</td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={score[2]}
                    onChange={(newScore: string): void => setScore([score[0], score[1], newScore, score[3]])}
                    tabIndex={3}
                  />
                </td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={uma[2]}
                    onChange={(newUma: string): void => setUma([uma[0], uma[1], newUma, uma[3]])}
                    tabIndex={7}
                  />
                </td>
                <td>
                  <NumberInput
                    label={""}
                    value={chombo[2]}
                    onChange={(newChombo: number): void => setChombo([chombo[0], chombo[1], newChombo, chombo[3]])}
                    steps={[20]}
                  />
                </td>
                <td>{getFinalForPlayer(2)}</td>
              </tr>
              <tr>
                <td>North</td>
                <td>{getPlayerName(selectedGame?.score.north.playerId)}</td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={score[3]}
                    onChange={(newScore: string): void => setScore([score[0], score[1], score[2], newScore])}
                    tabIndex={4}
                  />
                </td>
                <td>
                  <ManualNumberInput
                    label={""}
                    value={uma[3]}
                    onChange={(newUma: string): void => setUma([uma[0], uma[1], uma[2], newUma])}
                    tabIndex={8}
                  />
                </td>
                <td>
                  <NumberInput
                    label={""}
                    value={chombo[3]}
                    onChange={(newChombo: number): void => setChombo([chombo[0], chombo[1], chombo[2], newChombo])}
                    steps={[20]}
                  />
                </td>
                <td>{getFinalForPlayer(3)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>{null}</td>
                <td>Sum: {getSum()}</td>
                <td colSpan={3}>{null}</td>
              </tr>
            </tfoot>
          </table>
          <p>Enter points in short form, i.e. "12.3" instead of "12300".</p>
        </div>
      }
      {
        selectedGame && selectedGame.finished &&
        <p>This particular game has already been flagged as finished.</p>
      }
      {
        !selectedGame &&
        <p>This particular game is missing from tournament data for some reason.</p>
      }
      <button
        disabled={getSum() !== 0}
        onClick={() => storeGame()}>
        Store game
      </button>
      {
        getSum() !== 0 &&
        <p>Game cannot be saved because the raw points do not total 0. The sum is {getSum()}.</p>
      }
    </div>
  );
};

export default AddFinishedGame;