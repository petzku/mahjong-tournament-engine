import { useMemo } from "react";
import { Standing, Tournament } from "../../data-types/tournament-data-types";
import { formatPoints } from "../../utils/formatPoints";
import { generateArray } from "../../utils/generateArray";
import { getStandings } from "../../utils/getStandings";
import Comparison from "../Comparison";
import styles from "./StandingsTable.module.css";

type StandingsProps = {
  className?: string,
  split?: boolean,
  tournament: Tournament,
  afterRound: number
};

const StandingsTable = (props: StandingsProps) => {
  const playerCount = props.tournament.playerNames.length;

  const everyRound = useMemo(() => generateArray(props.tournament.info.rounds).map((round: number) => 
    getStandings({tournament: props.tournament, atRound: round})
  ), []);

  const comparisons = generateArray(playerCount).map((playerId: number) => {
    if (props.afterRound === 0)
    {
      return 0;
    }

    const previousPlacement = everyRound[props.afterRound - 1].findIndex((standing: Standing) => standing.playerId === playerId);
    const currentPlacement = everyRound[props.afterRound].findIndex((standing: Standing) => standing.playerId === playerId);
    return previousPlacement - currentPlacement;
  });

  const columnSplitLimit = props.split ? 24 : playerCount;
  const playersPerColumn = props.split ? 16 : playerCount;
  const columns = (props.split && playerCount >= columnSplitLimit) ? Math.ceil(playerCount/playersPerColumn) : 1;
  
  return (
    <div className={props.className}>
      {
        generateArray(columns).map((columnId: number) => (
          <table
            key={`standings-column-${columnId}`}
            className={styles.standingsTable}>
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
                everyRound[props.afterRound].filter((_: Standing, standingId: number) => columnId*playersPerColumn <= standingId && standingId < columnId*playersPerColumn+playersPerColumn).map((standing: Standing, index: number) => (
                  <tr key={`player-standing-${standing.playerId}`}>
                    <td className={styles.cell}>{columnId*playersPerColumn + index + 1}.</td>
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
        ))
      }
    </div>
  );
};

export default StandingsTable;