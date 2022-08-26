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
  CartesianGrid
} from "recharts";

import PostTabs from "../PostTabs";
import styles from "./ReportCards.module.css";

const ReportCards = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  
  const selectedPlayerId = 5;
  const playerName = tournamentState.playerNames[selectedPlayerId];

  const rankingEvolution = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number) => (
    getStandings({tournament: tournamentState, atRound: round}).reduce((carry: any, current: Standing, _: number, array: Standing[]) => {
      return {
        ...carry,
        [`player${current.playerId}`]: 1 + array.findIndex((standing: Standing): boolean => standing.playerId === current.playerId)
      }
    }, {name: `${round + 1}`})
  )), []);

  const positions = useMemo(() => generateArray(tournamentState.info.rounds).map((round: number) => (
    {
      name: `${round + 1}`,
      place: 1 + tournamentState.games
        //Get the game of current round that the selected player played in
        .filter((game: Game): boolean => game.round === round && game.participants.some((seat: Seat): boolean => seat.playerId === selectedPlayerId))[0]
        //Sort participants of that game
        .participants.sort((a: Seat, b: Seat) => (b.score.raw + b.score.uma + b.score.penalty) - (a.score.raw + a.score.uma + a.score.penalty))
        //Find position of the selected player
        .findIndex((seat: Seat) => seat.playerId === selectedPlayerId)
    }
  )), [])

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
          height={150}
          data={positions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis reversed={true}/>
            <Line
              dataKey={"place"}
              stroke={"#ff0000"}
              dot={true}
            />
        </LineChart>
      </div>
    </div>
  );
};

export default ReportCards;