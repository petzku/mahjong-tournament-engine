import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import PointInput, {PointInputType, getNumericValue} from "../../../components/PointInput";
import { generateArray } from "../../../utils/generateArray";
import { tournamentActionCreators, State } from "./../../../state";
import { Game, PlayerName } from "../../../data-types/tournament-data-types";
import {formatPoints} from "../../../utils/formatPoints";

import "./AddFinishedGame.scss";

type AddFinishedGameProps = {
  onFinish: Function
};

type PointState = [PointInputType, PointInputType, PointInputType, PointInputType];

const initialPointState: PointState = [
  {
    positive: true,
    value: 0
  },
  {
    positive: true,
    value: 0
  },
  {
    positive: true,
    value: 0
  },
  {
    positive: true,
    value: 0
  }
];

const AddFinishedGame = (props: AddFinishedGameProps) => {
  const [round, setRound] = useState<number>(0);
  const [table, setTable] = useState<number>(0);
  const [score, setScore] = useState<PointState>(initialPointState);
  const [uma, setUma] = useState<PointState>(initialPointState);
  const [chombo, setChombo] = useState<PointState>(initialPointState);

  const dispatch = useDispatch();
  const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);
  const tournamentState = useSelector((state: State) => state.tournament);

  const getPlayerName = (playerId: number): PlayerName => tournamentState.playerNames[playerId];

  const getScoreSum = (): number => {
    const east = getNumericValue(score[0]);
    const south = getNumericValue(score[1]);
    const west = getNumericValue(score[2]);
    const north = getNumericValue(score[3]);
    return east+south+west+north;
  };

  const getUmaSum = (): number => {
    const east = getNumericValue(uma[0]);
    const south = getNumericValue(uma[1]);
    const west = getNumericValue(uma[2]);
    const north = getNumericValue(uma[3]);
    return east+south+west+north;
  };

  const getFinalForPlayer = (seatId: number): number => {
    const playerScore = getNumericValue(score[seatId]);
    const playerUma = getNumericValue(uma[seatId]);
    const playerChombo = getNumericValue(chombo[seatId]);
    return playerScore + playerUma + playerChombo;
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

  const totalsOk = getScoreSum() === 0 && getUmaSum() === 0;

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
          <table className={"final-score-input-table"}>
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
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={score[0]}
                    onChange={(newValue: PointInputType) => setScore([newValue, score[1], score[2], score[3]])}
                    tabIndex={1}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={uma[0]}
                    onChange={(newValue: PointInputType) => setUma([newValue, uma[1], uma[2], uma[3]])}
                    tabIndex={5}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={chombo[0]}
                    onChange={(newValue: PointInputType) => setChombo([newValue, chombo[1], chombo[2], chombo[3]])}
                    tabIndex={9}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(0))}</td>
              </tr>
              <tr>
                <td>South</td>
                <td>{getPlayerName(selectedGame?.score.south.playerId)}</td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={score[1]}
                    onChange={(newValue: PointInputType) => setScore([score[0], newValue, score[2], score[3]])}
                    tabIndex={2}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={uma[1]}
                    onChange={(newValue: PointInputType) => setUma([uma[0], newValue, uma[2], uma[3]])}
                    tabIndex={6}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={chombo[1]}
                    onChange={(newValue: PointInputType) => setChombo([chombo[0], newValue, chombo[2], chombo[3]])}
                    tabIndex={10}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(1))}</td>
              </tr>
              <tr>
                <td>West</td>
                <td>{getPlayerName(selectedGame?.score.west.playerId)}</td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={score[2]}
                    onChange={(newValue: PointInputType) => setScore([score[0], score[1], newValue, score[3]])}
                    tabIndex={3}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={uma[2]}
                    onChange={(newValue: PointInputType) => setUma([uma[0], uma[1], newValue, uma[3]])}
                    tabIndex={7}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={chombo[2]}
                    onChange={(newValue: PointInputType) => setChombo([chombo[0], chombo[1], newValue, chombo[3]])}
                    tabIndex={11}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(2))}</td>
              </tr>
              <tr>
                <td>North</td>
                <td>{getPlayerName(selectedGame?.score.north.playerId)}</td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={score[3]}
                    onChange={(newValue: PointInputType) => setScore([score[0], score[1], score[2], newValue])}
                    tabIndex={4}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={uma[3]}
                    onChange={(newValue: PointInputType) => setUma([uma[0], uma[1], uma[2], newValue])}
                    tabIndex={8}
                  />
                </td>
                <td>
                  <PointInput
                    className={"finished-game-score-input"}
                    label={""}
                    value={chombo[3]}
                    onChange={(newValue: PointInputType) => setChombo([chombo[0], chombo[1], uma[3], newValue])}
                    tabIndex={12}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(3))}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>{null}</td>
                <td>Sum: {formatPoints(getScoreSum())}</td>
                <td>Sum: {formatPoints(getUmaSum())}</td>
                <td colSpan={2}>{null}</td>
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
        disabled={getScoreSum() !== 0}
        onClick={() => storeGame()}>
        Store game
      </button>
      {
        !totalsOk &&
        <p>Game cannot be saved because the raw points and/or uma do not total 0.</p>
      }
    </div>
  );
};

export default AddFinishedGame;