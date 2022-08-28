import { Game, Table, Tournament } from "../../../data-types/tournament-data-types";

import styles from "./PrintTableSigns.module.css";
import Schedule from "./Schedule";
import TableInfo from "./TableInfo";

const PrintTableSigns = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  const getSchedule = (table: number): Game[] => tournament.games
    .filter((game: Game): boolean => game.table === table)
    .sort((a: Game, b: Game) => a.round - b.round);

  return (
    <div>
      {
        tournament.tables.map((table: Table, tableId: number) => (
          <div key={`tablesign-${tableId}`} className={styles.columns}>
            <div className={styles.sign}>
              <h1>Table</h1>
              <div className={styles.number}>
                {tableId + 1}
              </div>
            </div>
            <div className={styles.information}>
              <TableInfo
                {...table}
              />
            </div>
            <div className={styles.schedule}>
              <Schedule
                games={getSchedule(tableId)}
                playerNames={tournament.playerNames}
              />
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default PrintTableSigns;