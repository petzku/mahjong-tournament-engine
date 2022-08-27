import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Game, PlayerId, Seat } from "../../../../data-types/tournament-data-types";
import { State } from "../../../../state";
import { generateArray } from "../../../../utils/generateArray";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine
} from "recharts";

type PositionDataPoint = {
  name: string,
  position: number
};

type PositionData = {
  evolution: PositionDataPoint[],
  mean: number
};

type PositionsProps = {
  playerId: PlayerId
};

const Positions = (props: PositionsProps) => {
  const tournamentState = useSelector((state: State) => state.tournament);

  // Data format for recharts: Array of objects for each round. Object contains round label ("name") and 
  //  properties of each line's value for that line.

  //For position graph, get position evolution and mean position.
  const positions: PositionData = useMemo(() => {
    const evolution: PositionDataPoint[] = generateArray(tournamentState.info.rounds).map((round: number): PositionDataPoint => ({
      name: `${round + 1}`,
      position: 1 + tournamentState.games
        //Get the game of current round that the selected player played in
        .filter((game: Game): boolean => game.round === round && game.participants.some((seat: Seat): boolean => seat.playerId === props.playerId))[0]
        //Sort participants of that game
        .participants.sort((a: Seat, b: Seat) => (b.score.raw + b.score.uma + b.score.penalty) - (a.score.raw + a.score.uma + a.score.penalty))
        //Find position of the selected player
        .findIndex((seat: Seat) => seat.playerId === props.playerId)
    }));

    const mean = evolution.reduce((carry: number, point: PositionDataPoint): number => carry+point.position, 0) / tournamentState.info.rounds;

    return {
      evolution,
      mean
    };
  }, []);

  return (
    <div>
      <h3>Positions</h3>
      <LineChart
        width={700}
        height={200}
        data={positions.evolution}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis reversed={true}/>
        <ReferenceLine y={positions.mean} stroke="#7777ff" />
        <Line
          dataKey={"position"}
          stroke={"#ff0000"}
          dot={true}
        />
      </LineChart>
    </div>
  );
};

export default Positions;