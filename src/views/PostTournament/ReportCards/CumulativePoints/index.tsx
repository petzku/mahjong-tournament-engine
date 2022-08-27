import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Game, PlayerId, Score, Seat } from "../../../../data-types/tournament-data-types";
import { State } from "../../../../state";
import { generateArray } from "../../../../utils/generateArray";
import { formatPoints } from "../../../../utils/formatPoints";

import styles from "./CumulativePoints.module.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

type CumulativePointsProps = {
  playerId: PlayerId
};

const CumulativePoints = (props: CumulativePointsProps) => {
  const tournamentState = useSelector((state: State) => state.tournament);

  //For cumulative points chart, reduce game of that round and earlier rounds into a score sum.
  const cumulativePoints = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number): Score => (
    tournamentState.games.reduce((carry: Score, game: Game): Score => {
      const seat = game.participants.findIndex((seat: Seat): boolean => seat.playerId === props.playerId);

      //Skip the games that the player didn't play in, and games that aren't in the range of round
      if (game.round > round || seat === -1)
      {
        return carry;
      }

      //Otherwise the player did play in this game, so we sum their score from this game to the carried sum.
      return {
        raw: carry.raw + game.participants[seat].score.raw,
        uma: carry.uma + game.participants[seat].score.uma,
        penalty: carry.penalty + game.participants[seat].score.penalty,
      }
    }, {raw: 0, uma: 0, penalty: 0})
  )).map((cumulatedPoints: Score, round: number) => ({
    name: `${round + 1}`,
    total: cumulatedPoints.raw + cumulatedPoints.uma + cumulatedPoints.penalty,
    ...cumulatedPoints
  })), [props.playerId]);

  return (
    <div>
      <h3>Cumulative points</h3>
      <LineChart
        width={700}
        height={350}
        data={cumulativePoints}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Legend/>
        <Line dataKey={"raw"} stroke={"#00aa00"} dot={true} />
        <Line dataKey={"uma"} stroke={"#0000ff"} dot={true} />
        <Line dataKey={"penalty"} stroke={"#000000"} dot={true} />
        <Line dataKey={"total"} stroke={"#ff0000"} dot={true} />
      </LineChart>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{null}</th>
            <th className={styles.cell}>Raw</th>
            <th className={styles.cell}>Uma</th>
            <th className={styles.cell}>Penalty</th>
            <th className={styles.cell}>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cumulativePoints.map((current) => (
              <tr key={`cumulativePoints-${current.name}`}>
                <th>Round {current.name}</th>
                <td className={styles.cell}>{formatPoints({points: current.raw, sign: true})}</td>
                <td className={styles.cell}>{formatPoints({points: current.uma, sign: true})}</td>
                <td className={styles.cell}>{formatPoints({points: current.penalty, sign: true})}</td>
                <td className={styles.cell}>{formatPoints({points: current.total, sign: true})}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default CumulativePoints;