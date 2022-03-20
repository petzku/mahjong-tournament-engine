import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../data-types/app-data-types";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import { PlayerName } from "../../data-types/tournament-data-types";

const PlayerEntryView = () => {
  const [players, setPlayers] = useState<PlayerName[]>([]);
  const dispatch = useDispatch();
  
  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)
  const {changeView} = bindActionCreators(appActionCreators, dispatch);
  
  const rightAmount = players.length > 0 && players.length % 4 === 0;

  const saveAndContinue = (): void => {
    addPlayers(players);
    changeView(Views.TableEntry);
  };

  return (
    <div>
      <p>Enter players, one per line. Currently {players.length} players.</p>
      <textarea
        value={players}
        onChange={(e) => setPlayers(e.target.value.split("\n").filter(name => name !== ""))}
      />
      {
        !rightAmount &&
        <p>Must have a number of players that is divisible by 4.</p>
      }
      <button
        disabled={!rightAmount}
        onClick={() => saveAndContinue()}>
        Save
      </button>
    </div>
  );
};

export default PlayerEntryView;