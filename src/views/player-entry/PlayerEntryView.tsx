import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../types/app-types";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

const PlayerEntryView = () => {
  const [players, setPlayers] = useState("");
  const dispatch = useDispatch();
  
  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)
  const {changeView} = bindActionCreators(appActionCreators, dispatch);
  
  const playerList = players.split("\n").filter(name => name !== "");
  const playerCount = playerList.length;
  const rightAmount = playerCount > 0 && playerCount%4 === 0;

  const onSave = (): void => {
    addPlayers(playerList);
    changeView(Views.TableEntry);
  };

  return (
    <div>
      <p>Enter players, one per line. Currently {playerCount} players.</p>
      <textarea
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
      />
      {
        !rightAmount &&
        <p>Must have a number of players that is divisible by 4.</p>
      }
      <button
        disabled={!rightAmount}
        onClick={() => onSave()}>
        Save
      </button>
    </div>
  );
};

export default PlayerEntryView;