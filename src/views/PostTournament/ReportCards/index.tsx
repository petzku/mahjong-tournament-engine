import { useSelector } from "react-redux";
import { Game, Seat, Standing } from "../../../data-types/tournament-data-types";
import { State } from "../../../state";
import { generateArray } from "../../../utils/generateArray";
import { getStandings } from "../../../utils/getStandings";

import { useMemo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine
} from "recharts";

import PostTabs from "../PostTabs";
import styles from "./ReportCards.module.css";

type PositionDataPoint = {
  name: string,
  position: number
};

type PositionData = {
  evolution: PositionDataPoint[],
  mean: number
};

const ReportCards = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  
  const selectedPlayerId = 5;
  const playerName = tournamentState.playerNames[selectedPlayerId];

  // Data format for recharts: Array of objects for each round. Object contains round label ("name") and 
  //  a property for each player's score on that round.
 
  //For rankin evolution, generate array of all standings from all rounds. 1) Loop through all rounds.
  const rankingEvolution = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number) => (
    // 2) Get standings for current round.
    // 3) Reformat standings into recharts data format.
    getStandings({tournament: tournamentState, atRound: round}).reduce((carry: any, current: Standing, _: number, array: Standing[]) => ({
        ...carry,
        [`player${current.playerId}`]: 1 + array.findIndex((standing: Standing): boolean => standing.playerId === current.playerId)
      }
    ), {name: `${round + 1}`})
  )), []);

  //For position graph, get position evolution and mean position.
  const positions: PositionData = useMemo(() => {
    const evolution: PositionDataPoint[] = generateArray(tournamentState.info.rounds).map((round: number): PositionDataPoint => ({
      name: `${round + 1}`,
      position: 1 + tournamentState.games
        //Get the game of current round that the selected player played in
        .filter((game: Game): boolean => game.round === round && game.participants.some((seat: Seat): boolean => seat.playerId === selectedPlayerId))[0]
        //Sort participants of that game
        .participants.sort((a: Seat, b: Seat) => (b.score.raw + b.score.uma + b.score.penalty) - (a.score.raw + a.score.uma + a.score.penalty))
        //Find position of the selected player
        .findIndex((seat: Seat) => seat.playerId === selectedPlayerId)
    }));

    const mean = evolution.reduce((carry: number, point: PositionDataPoint) => carry+point.position, 0) / tournamentState.info.rounds;

    return {
      evolution,
      mean
    };
  }, [])

  return (
    <div>
      <PostTabs/>
      <h1>Player report cards</h1>
      <h2>Report for player {playerName}</h2>
      <div>
        <h3>Ranking evolution</h3>
        <LineChart
          width={700}
          height={300}
          data={rankingEvolution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis reversed={true}/>
          {
            generateArray(tournamentState.playerNames.length).map((playerId: number) => (
              <Line
                key={`rankingEvolution-player-${playerId}`}
                dataKey={`player${playerId}`}
                stroke={playerId === selectedPlayerId ? "#ff0000" : "#ffcccc"}
                dot={playerId === selectedPlayerId}
              />
            ))
          }
        </LineChart>
      </div>
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
    </div>
  );
};

export default ReportCards;