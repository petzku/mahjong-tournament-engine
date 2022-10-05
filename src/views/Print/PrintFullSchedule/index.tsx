import { useEffect } from "react";
import Round from "./Round";
import { Game, Tournament } from "../../../data-types/tournament-data-types";
import { generateArray } from "../../../utils/generateArray";
import { landscapeLayout } from "../../../utils/landscapeLayout";

import styles from "./PrintFullSchedule.module.css";

const PrintFullSchedule = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
  
  const rounds = generateArray(tournament.info.rounds);
  const tables = generateArray(tournament.playerNames.length/4);

  useEffect(landscapeLayout, []);

  return (
    <table className={styles.fullSchedule}>
      <thead>
        <tr>
          <th colSpan={tournament.tables.length + 1}>
            {tournament.info.title}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{null}</td>
          {
            tables.map((tableId: number) => (
              <th colSpan={2}>
                Table {tableId + 1}
              </th>
            ))
          }
        </tr>
      </tbody>
      {
        rounds.map((roundId: number) => (
          <Round
            roundId={roundId}
            games={tournament.games.filter((game: Game) => game.round === roundId)}
            playerNames={tournament.playerNames}
          />
        ))
      }
    </table>
  );

  /* return (
    <table className={styles.fullSchedule}>
      <thead>
        <tr>
          <th colSpan={1 + tournament.tables.length}>
            {tournament.info.title}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{null}</th>
          {
            tables.map((tableId: number) => <th key={`table-th-${tableId}`}>{`Table ${tableId+1}`}</th>)
          }
        </tr>
        {
          rounds.map((roundId: number) => (
            <tr
              key={`round-tr-${roundId}`}
              className={styles.round}>
              {
                roundId % 4 === 0 &&
                <th>
                  {`Round ${roundId+1}`}
                </th>
              }
              {
                tables.map((tableId: number) => {
                  const game = tournament.games.find((game: Game): boolean => game.round === roundId && game.table === tableId);

                  return (
                    game
                    ?
                    <td className={styles.cell} key={`round-tr-${roundId}-table-td-${tableId}`}>
                      <Hanchan
                        east={tournament.playerNames[game.participants[0].playerId]}
                        south={tournament.playerNames[game.participants[1].playerId]}
                        west={tournament.playerNames[game.participants[2].playerId]}
                        north={tournament.playerNames[game.participants[3].playerId]}
                        finished={false}
                        hilight={""}
                        onClick={() => {}}
                      />
                    </td>
                    :
                    <td>Game undefined</td>
                  );
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  ); */
};

export default PrintFullSchedule;