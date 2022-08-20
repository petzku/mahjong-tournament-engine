import { useState } from "react";
import { useSelector } from "react-redux";
import Dropdown, { DropdownItem } from "../../../components/Dropdown";
import { Game, PlayerId, PlayerName, Seat } from "../../../data-types/tournament-data-types";
import { State } from "../../../state";

type Placement = {
  round: number,
  table: number,
  seat: number
};

const PlayerSchedules = () => {
  const [player, setPlayer] = useState<PlayerId>(0);
  const tournamentState = useSelector((state: State) => state.tournament);

  const items = tournamentState.playerNames.map((name: PlayerName, id: PlayerId): DropdownItem => ({
    value: id,
    text: name
  }));

  const placements: Placement[] = tournamentState.games.filter((game: Game): boolean => (
    game.participants.some((participant: Seat): boolean => participant.playerId === player)
  )).map((game: Game): Placement => ({
    round: game.round,
    table: game.table,
    seat: game.participants.findIndex((participant: Seat): boolean => participant.playerId === player)
  }));

  return (
    <div>
      <Dropdown
        label={"Player"}
        value={player}
        items={items}
        onChange={(newValue: PlayerId) => setPlayer(newValue)}
      />
      <h2>Schedule for player {tournamentState.playerNames[player]}</h2>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Table</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {
            placements.map((placement: Placement) => (
              <tr key={`player-${player}-placemet-${placement.round}`}>
                <td>{placement.round + 1}</td>
                <td>{placement.table + 1}</td>
                <td>{["East", "South", "West", "North"][placement.seat]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default PlayerSchedules;