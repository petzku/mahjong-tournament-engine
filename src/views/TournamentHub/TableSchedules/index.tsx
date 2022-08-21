import { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown, { DropdownItem } from "../../../components/Dropdown";
import { Game, Table } from "../../../data-types/tournament-data-types";
import { State } from "../../../state";
import HubTabs from "../HubTabs";

const TableSchedules = () => {
  const [table, setTable] = useState<number>(0);
  const tournamentState = useSelector((state: State) => state.tournament);

  const items: DropdownItem[] = tournamentState.tables.map((_: Table, id: number): DropdownItem => ({
    value: id,
    text: `Table ${id + 1}`
  }));

  const schedule: Game[] = tournamentState.games.filter((game: Game): boolean => game.table === table)
    .sort((a: Game, b: Game) => a.round > b.round ? 1 : -1);

  return (
    <div>
      <HubTabs/>
      <Dropdown
        label={"Table"}
        value={table}
        items={items}
        onChange={(newValue: number) => setTable(newValue)}
      />
      <h2>Schedule for table {table + 1}</h2>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {
            schedule.map((game: Game, round: number) => (
              <tr key={`table-${table}-schedule-${round}`}>
                <td>Round {round + 1}</td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>East</td>
                        <td>{tournamentState.playerNames[schedule[round].participants[0].playerId]}</td>
                      </tr>
                      <tr>
                        <td>South</td>
                        <td>{tournamentState.playerNames[schedule[round].participants[1].playerId]}</td>
                      </tr>
                      <tr>
                        <td>West</td>
                        <td>{tournamentState.playerNames[schedule[round].participants[2].playerId]}</td>
                      </tr>
                      <tr>
                        <td>North</td>
                        <td>{tournamentState.playerNames[schedule[round].participants[3].playerId]}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default TableSchedules;