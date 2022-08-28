import { Game, PlayerName } from "../../../../data-types/tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";

import styles from "./Schedule.module.css";

type SchedulesProps = {
  games: Game[],
  playerNames: PlayerName[]
};

const Schedule = (props: SchedulesProps) => {
  const columns = Math.round(props.games.length/4);

  return (
    <div className={styles.columns}>
      {
        generateArray(columns).map((column: number) => (
          <table key={`schedule-column-${column}`}>
          {
            props.games
            .filter((_: Game, index: number) => column*4 <= index && index < column*4+4)
            .map((game: Game, round: number) => (
              <tbody key={`schedule-column-${column}-round-${round}`}>
                <tr>
                  <th colSpan={2}>Round {1 + column*4 + round}</th>
                </tr>
                <tr>
                  <td>East</td>
                  <td>{props.playerNames[game.participants[0].playerId]}</td>
                </tr>
                <tr>
                  <td>South</td>
                  <td>{props.playerNames[game.participants[1].playerId]}</td>
                </tr>
                <tr>
                  <td>West</td>
                  <td>{props.playerNames[game.participants[2].playerId]}</td>
                </tr>
                <tr>
                  <td>North</td>
                  <td>{props.playerNames[game.participants[3].playerId]}</td>
                </tr>
              </tbody>
            ))
          }
          </table>
        ))
      }
    </div>
  );
};

export default Schedule;