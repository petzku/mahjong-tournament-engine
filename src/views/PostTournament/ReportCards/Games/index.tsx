import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Game, PlayerId, Score, Seat } from "../../../../data-types/tournament-data-types";
import { State } from "../../../../state";
import { formatPoints } from "../../../../utils/formatPoints";

import styles from "./Games.module.css";

type GamesProps = {
  playerId: PlayerId
};

const Games = (props: GamesProps) => {
  const tournamentState = useSelector((state: State) => state.tournament);

  const getTotal = (score: Score) => formatPoints({points: score.raw + score.uma + score.penalty, sign: true});

  const games = useMemo(() => tournamentState.games
    //Find the games where the selected player was in.
    .filter((game: Game): boolean => game.participants.some((seat: Seat): boolean => seat.playerId === props.playerId))
    //Make sure they're sorted in round order
    .sort((a: Game, b: Game) => a.round - b.round), [props.playerId]);

  return (
    <div>
      <table>
      {
        games.map((game: Game, round: number) => (
          <tbody>
            <tr>
              <th className={styles.roundHeader} colSpan={4}>Round {round + 1}</th>
            </tr>
            <tr>
              <td>East</td>
              <td>{tournamentState.playerNames[game.participants[0].playerId]}</td>
              <td>{getTotal(game.participants[0].score)}</td>
            </tr>
            <tr>
              <td>South</td>
              <td>{tournamentState.playerNames[game.participants[1].playerId]}</td>
              <td>{getTotal(game.participants[1].score)}</td>
            </tr>
            <tr>
              <td>West</td>
              <td>{tournamentState.playerNames[game.participants[2].playerId]}</td>
              <td>{getTotal(game.participants[2].score)}</td>
            </tr>
            <tr>
              <td>North</td>
              <td>{tournamentState.playerNames[game.participants[3].playerId]}</td>
              <td>{getTotal(game.participants[3].score)}</td>
            </tr>
          </tbody>
        ))
      }
    </table>
    </div>
  );
};

export default Games;