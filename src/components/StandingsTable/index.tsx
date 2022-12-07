import { useMemo } from "react";
import { Standing, Tournament } from "../../data-types/tournament-data-types";
import { formatPoints } from "../../utils/formatPoints";
import { generateArray } from "../../utils/generateArray";
import { getStandings } from "../../utils/getStandings";
import Comparison from "../Comparison";
import styles from "./StandingsTable.module.css";

type StandingsProps = {
  tournament: Tournament,
  afterRound: number
};

const StandingsTable = (props: StandingsProps) => {
  const everyRound = useMemo(() => generateArray(props.tournament.info.rounds).map((round: number) => 
    getStandings({tournament: props.tournament, atRound: round})
  ), []);

  const comparisons = generateArray(props.tournament.playerNames.length).map((playerId: number) => {
    if (props.afterRound === 0)
    {
      return 0;
    }

    const previousPlacement = everyRound[props.afterRound - 1].findIndex((standing: Standing) => standing.playerId === playerId);
    const currentPlacement = everyRound[props.afterRound].findIndex((standing: Standing) => standing.playerId === playerId);
    return previousPlacement - currentPlacement;
  });

  return (
    <div>
      <table
        className={styles.standingsPopup}>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Player</th>
            <th>Total</th>
            <th>{null}</th>
          </tr>
        </thead>
        <tbody>
          {
            everyRound[props.afterRound].map((standing: Standing, index: number) => (
              <tr key={`player-standing-${standing.playerId}`}>
                <td className={styles.cell}>{index + 1}.</td>
                <td className={styles.cell}>{props.tournament.playerNames[standing.playerId]}</td>
                <td className={styles.cell}>{formatPoints({points: standing.points, sign: true})}</td>
                {
                  comparisons[standing.playerId] !== 0
                  ?
                  <Comparison change={comparisons[standing.playerId]}/>
                  :
                  <td>{null}</td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;