import { useMemo } from "react";
import { useSelector } from "react-redux";
import { PlayerId, Standing, Tournament } from "../../../../data-types/tournament-data-types";
import { State } from "../../../../state";
import { generateArray } from "../../../../utils/generateArray";
import { getStandings } from "../../../../utils/getStandings";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

type RankingEvolutionProps = {
  tournament: Tournament,
  playerId: PlayerId
};

const RankingEvolution = (props: RankingEvolutionProps) => {
  // Data format for recharts: Array of objects for each round. Object contains round label ("name") and 
  //  properties of each line's value for that line.
 
  //For ranking evolution, generate array of all standings from all rounds. 1) Loop through all rounds.
  const ranking = useMemo(() => generateArray(props.tournament.info.rounds).map((round: number) => (
    // 2) Get standings for current round.
    // 3) Reformat standings into recharts data format.
    getStandings({tournament: props.tournament, atRound: round}).reduce((carry: any, current: Standing, _: number, array: Standing[]) => ({
        ...carry,
        [`player${current.playerId}`]: 1 + array.findIndex((standing: Standing): boolean => standing.playerId === current.playerId)
      }
    ), {name: `${round + 1}`})
  )), []);

  return (
    <div>
    <h3>Ranking evolution</h3>
      <LineChart
        width={700}
        height={300}
        data={ranking}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis reversed={true}/>
        {
          generateArray(props.tournament.playerNames.length).map((playerId: number) => (
            <Line
              key={`rankingEvolution-player-${playerId}`}
              dataKey={`player${playerId}`}
              stroke={playerId === props.playerId ? "#ff0000" : "#ffcccc"}
              dot={playerId === props.playerId}
              isAnimationActive={false}
            />
          ))
        }
      </LineChart>
    </div>
  );
};

export default RankingEvolution;