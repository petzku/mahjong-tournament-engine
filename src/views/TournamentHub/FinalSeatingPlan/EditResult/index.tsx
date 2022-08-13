import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import PointInput, {PointInputType, getNumericValue} from "../../../../components/PointInput";
import Popup from "../../../../components/Popup";

import { tournamentActionCreators, State } from "../../../../state";
import { Game, PlayerName, Score } from "../../../../data-types/tournament-data-types";
import {formatPoints} from "../../../../utils/formatPoints";

type AddFinishedGameProps = {
  round: number,
  table: number,
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

const EditResult = (props: AddFinishedGameProps) => {
  const tournamentState = useSelector((state: State) => state.tournament);
  const editedGame = tournamentState.games.find((game: Game): boolean => (game.round === props.round && game.table === props.table));

  const [score, setScore] = useState<PointState>([
    {
      positive: editedGame ? editedGame.participants[0].score.raw >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[0].score.raw : 0)
    },
    {
      positive: editedGame ? editedGame.participants[1].score.raw >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[1].score.raw : 0)
    },
    {
      positive: editedGame ? editedGame.participants[2].score.raw >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[2].score.raw : 0)
    },
    {
      positive: editedGame ? editedGame.participants[3].score.raw >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[3].score.raw : 0)
    }
  ]);
  const [uma, setUma] = useState<PointState>([
    {
      positive: editedGame ? editedGame.participants[0].score.uma >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[0].score.uma : 0)
    },
    {
      positive: editedGame ? editedGame.participants[1].score.uma >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[1].score.uma : 0)
    },
    {
      positive: editedGame ? editedGame.participants[2].score.uma >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[2].score.uma : 0)
    },
    {
      positive: editedGame ? editedGame.participants[3].score.uma >= 0 : true,
      value: Math.abs(editedGame ? editedGame.participants[3].score.uma : 0)
    }
  ]);
  const [penalty, setPenalty] = useState<PointState>([
    {
      positive: false,
      value: Math.abs(editedGame ? editedGame.participants[0].score.penalty : 0)
    },
    {
      positive: false,
      value: Math.abs(editedGame ? editedGame.participants[1].score.penalty : 0)
    },
    {
      positive: false,
      value: Math.abs(editedGame ? editedGame.participants[2].score.penalty : 0)
    },
    {
      positive: false,
      value: Math.abs(editedGame ? editedGame.participants[3].score.penalty : 0)
    }
  ]);

  const dispatch = useDispatch();
  const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);

  const getPlayerName = (playerId: number): PlayerName => tournamentState.playerNames[playerId];

  const getScoreSum = (): number => {
    const east = getNumericValue(score[0]);
    const south = getNumericValue(score[1]);
    const west = getNumericValue(score[2]);
    const north = getNumericValue(score[3]);
    return east + south + west + north;
  };

  const getUmaSum = (): number => {
    const east = getNumericValue(uma[0]);
    const south = getNumericValue(uma[1]);
    const west = getNumericValue(uma[2]);
    const north = getNumericValue(uma[3]);
    return east + south + west + north;
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

  const storeGame = () => {
    if (editedGame)
    {
      const gameData: Game = {
        round: props.round,
        table: props.table,
        finished: true,
        participants: [
          {
            playerId: editedGame.participants[0].playerId,
            score: getScoreForPlayer(0)
          },
          {
            playerId: editedGame.participants[1].playerId,
            score: getScoreForPlayer(1)
          },
          {
            playerId: editedGame.participants[2].playerId,
            score: getScoreForPlayer(2)
          },
          {
            playerId: editedGame.participants[3].playerId,
            score: getScoreForPlayer(3)
          }
        ]
      };

      const updatedGames = tournamentState.games.map((game: Game) => (
        game.round === props.round && game.table === props.table ? gameData : game
      ));

      addGames(updatedGames);

      props.onFinish();
    }
  };

  const totalsOk = getScoreSum() === 0 && getUmaSum() === 0;

  return (
    <Popup
      title={"Add Finished Game"}
      cancelText={"Discard"}
      confirmText={"Store results"}
      onCancel={() => props.onFinish()}
      onConfirm={() => storeGame()}
      confirmDisabled={!totalsOk}>
      <p>Editing results for Round {props.round + 1} Table {props.table + 1}.</p>
      {
        editedGame && editedGame.finished &&
        <p><strong>This game is already stored. Score can still be edited.</strong></p>
      }
      {
        editedGame &&
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
                <td>{getPlayerName(editedGame?.participants[0].playerId)}</td>
                <td>
                  <PointInput
                    label={""}
                    value={score[0]}
                    onChange={(newValue: PointInputType) => setScore([newValue, score[1], score[2], score[3]])}
                    tabIndex={1}
                  />
                </td>
                <td>
                  <PointInput
                    label={""}
                    value={uma[0]}
                    onChange={(newValue: PointInputType) => setUma([newValue, uma[1], uma[2], uma[3]])}
                    tabIndex={5}
                  />
                </td>
                <td>
                  <PointInput
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
                <td>{getPlayerName(editedGame?.participants[1].playerId)}</td>
                <td>
                  <PointInput
                    label={""}
                    value={score[1]}
                    onChange={(newValue: PointInputType) => setScore([score[0], newValue, score[2], score[3]])}
                    tabIndex={2}
                  />
                </td>
                <td>
                  <PointInput
                    label={""}
                    value={uma[1]}
                    onChange={(newValue: PointInputType) => setUma([uma[0], newValue, uma[2], uma[3]])}
                    tabIndex={6}
                  />
                </td>
                <td>
                  <PointInput
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
                <td>{getPlayerName(editedGame?.participants[2].playerId)}</td>
                <td>
                  <PointInput
                    label={""}
                    value={score[2]}
                    onChange={(newValue: PointInputType) => setScore([score[0], score[1], newValue, score[3]])}
                    tabIndex={3}
                  />
                </td>
                <td>
                  <PointInput
                    label={""}
                    value={uma[2]}
                    onChange={(newValue: PointInputType) => setUma([uma[0], uma[1], newValue, uma[3]])}
                    tabIndex={7}
                  />
                </td>
                <td>
                  <PointInput
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
                <td>{getPlayerName(editedGame?.participants[3].playerId)}</td>
                <td>
                  <PointInput
                    label={""}
                    value={score[3]}
                    onChange={(newValue: PointInputType) => setScore([score[0], score[1], score[2], newValue])}
                    tabIndex={4}
                  />
                </td>
                <td>
                  <PointInput
                    label={""}
                    value={uma[3]}
                    onChange={(newValue: PointInputType) => setUma([uma[0], uma[1], uma[2], newValue])}
                    tabIndex={8}
                  />
                </td>
                <td>
                  <PointInput
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
        editedGame && editedGame.finished &&
        <p>This particular game has already been flagged as finished.</p>
      }
      {
        !editedGame &&
        <p>This particular game is missing from tournament data for some reason.</p>
      }
      {
        !totalsOk &&
        <p>Game cannot be saved because the raw points and/or uma do not total 0.</p>
      }
    </Popup>
  );
};

export default EditResult;