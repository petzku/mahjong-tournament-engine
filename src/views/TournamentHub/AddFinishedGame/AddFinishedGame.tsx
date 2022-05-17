import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import PointInput, {PointInputType, getNumericValue} from "../../../components/PointInput";
import { generateArray } from "../../../utils/generateArray";
import { tournamentActionCreators, State } from "../../../state";
import { Game, PlayerName, Score } from "../../../data-types/tournament-data-types";
import {formatPoints} from "../../../utils/formatPoints";

import "./AddFinishedGame.scss";

type AddFinishedGameProps = {
  onFinish: () => void
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

const initialPenaltyState: PointState = [
  {
    positive: false,
    value: 0
  },
  {
    positive: false,
    value: 0
  },
  {
    positive: false,
    value: 0
  },
  {
    positive: false,
    value: 0
  }
];

const AddFinishedGame = (props: AddFinishedGameProps) => {
  const [round, setRound] = useState<number>(0);
  const [table, setTable] = useState<number>(0);
  const [score, setScore] = useState<PointState>(initialPointState);
  const [uma, setUma] = useState<PointState>(initialPointState);
  const [penalty, setPenalty] = useState<PointState>(initialPenaltyState);

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

  const getScoreForPlayer = (seatId: number): Score => ({
    raw: getNumericValue(score[seatId]),
    uma: getNumericValue(uma[seatId]),
    penalty: getNumericValue(penalty[seatId])
  });

  const getFinalForPlayer = (seatId: number): number => {
    const score = getScoreForPlayer(seatId);
    return score.raw + score.uma + score.penalty;
  };

  const roundSelectionItems: DropdownItem[] = generateArray(tournamentState.info.rounds).map((roundId: number): DropdownItem => {
    const finished = !tournamentState.games.filter((game: Game): boolean => game.round === roundId).some((game: Game): boolean => !game.finished);
    return {
      value: roundId,
      text: `Round ${roundId + 1} ${finished ? "(finished)" : ""}`
    };
  });

  const tableSelectionItems: DropdownItem[] = generateArray(tournamentState.playerNames.length/4).map((tableId: number): DropdownItem => {
    const game = tournamentState.games.find((game: Game): boolean => game.round === round && game.table === tableId);
    return {
      value: tableId,
      text: `Table ${tableId + 1} ${game?.finished ? "(finished)" : ""}`
    };
  });

  const selectedGame = tournamentState.games.find((game: Game): boolean => (game.round === round && game.table === table));

  const storeGame = () => {
    if (selectedGame)
    {
      const gameData: Game = {
        round: round,
        table: table,
        finished: true,
        participants: [
          {
            playerId: selectedGame.participants[0].playerId,
            score: getScoreForPlayer(0)
          },
          {
            playerId: selectedGame.participants[1].playerId,
            score: getScoreForPlayer(1)
          },
          {
            playerId: selectedGame.participants[2].playerId,
            score: getScoreForPlayer(2)
          },
          {
            playerId: selectedGame.participants[3].playerId,
            score: getScoreForPlayer(3)
          }
        ]
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
                <th>Penalty</th>
                <th>Final</th>
              </tr>
              <tr>
                <td>East</td>
                <td>{getPlayerName(selectedGame?.participants[0].playerId)}</td>
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
                    value={penalty[0]}
                    onChange={(newValue: PointInputType) => setPenalty([newValue, penalty[1], penalty[2], penalty[3]])}
                    tabIndex={9}
                    unflippable={true}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(0))}</td>
              </tr>
              <tr>
                <td>South</td>
                <td>{getPlayerName(selectedGame?.participants[1].playerId)}</td>
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
                    value={penalty[1]}
                    onChange={(newValue: PointInputType) => setPenalty([penalty[0], newValue, penalty[2], penalty[3]])}
                    tabIndex={10}
                    unflippable={true}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(1))}</td>
              </tr>
              <tr>
                <td>West</td>
                <td>{getPlayerName(selectedGame?.participants[2].playerId)}</td>
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
                    value={penalty[2]}
                    onChange={(newValue: PointInputType) => setPenalty([penalty[0], penalty[1], newValue, penalty[3]])}
                    tabIndex={11}
                    unflippable={true}
                  />
                </td>
                <td>{formatPoints(getFinalForPlayer(2))}</td>
              </tr>
              <tr>
                <td>North</td>
                <td>{getPlayerName(selectedGame?.participants[3].playerId)}</td>
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
                    value={penalty[3]}
                    onChange={(newValue: PointInputType) => setPenalty([penalty[0], penalty[1], uma[3], newValue])}
                    tabIndex={12}
                    unflippable={true}
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
        disabled={!totalsOk}
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