import { useSearchParams } from "react-router-dom";
import Comparison from "../../../../components/Comparison";
import { Standing, Tournament } from "../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../utils/formatPoints";
import { generateArray } from "../../../../utils/generateArray";
import { getStandings } from "../../../../utils/getStandings";
import styles from "./StandingsPopup.module.css";

const StandingsPopup = () => {
  const [searchParams] = useSearchParams();
  const afterRound = parseInt(searchParams.get("afterRound") as string);
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  const everyRound = generateArray(tournament.info.rounds).map((round: number) => (
    getStandings({tournament: tournament, atRound: round})
  ));

  const comparisons = generateArray(tournament.playerNames.length).map((playerId: number) => {
    if (afterRound === 0)
    {
      return 0;
    }

    const previousPlacement = everyRound[afterRound - 1].findIndex((standing: Standing) => standing.playerId === playerId);
    const currentPlacement = everyRound[afterRound].findIndex((standing: Standing) => standing.playerId === playerId);
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
            getStandings({tournament: tournament, atRound: tournament.info.rounds}).map((standing: Standing, index: number) => (
              <tr key={`player-standing-${standing.playerId}`}>
                <td className={styles.cell}>{index + 1}.</td>
                <td className={styles.cell}>{tournament.playerNames[standing.playerId]}</td>
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

export default StandingsPopup;