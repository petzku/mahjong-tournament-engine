import { useSelector } from "react-redux";
import { Game, Score, Seat, Standing } from "../../../data-types/tournament-data-types";
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
  ReferenceLine,
  Legend
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
  
  const selectedPlayerId = 15;
  const playerName = tournamentState.playerNames[selectedPlayerId];

  // Data format for recharts: Array of objects for each round. Object contains round label ("name") and 
  //  a property for each player's score on that round.
 
  //For ranking evolution, generate array of all standings from all rounds. 1) Loop through all rounds.
  const ranking = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number) => (
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

    const mean = evolution.reduce((carry: number, point: PositionDataPoint): number => carry+point.position, 0) / tournamentState.info.rounds;

    return {
      evolution,
      mean
    };
  }, []);

  //For cumulative points chart, reduce game of that round and earlier rounds into a score sum.
  const cumulativePoints = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number): Score => (
    tournamentState.games.reduce((carry: Score, game: Game): Score => {
      const seat = game.participants.findIndex((seat: Seat): boolean => seat.playerId === selectedPlayerId);

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
  })), []);

  //TODO:
  //- highest and lowest single
  //- mean and distribution
  //- list of all the player's hanchans and points

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
          data={ranking}>
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
          <Line
            dataKey={"raw"}
            stroke={"#00aa00"}
            dot={true}
          />
          <Line
            dataKey={"uma"}
            stroke={"#0000ff"}
            dot={true}
          />
          <Line
            dataKey={"penalty"}
            stroke={"#000000"}
            dot={true}
          />
          <Line
            dataKey={"total"}
            stroke={"#ff0000"}
            dot={true}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default ReportCards;