import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../data-types/app-data-types";
import { tournamentActionCreators, State, appActionCreators } from "../../state";

import { PlayerId, PlayerName } from "../../data-types/tournament-data-types";
import TextInput from "../../components/TextInput";
import { generateArray } from "../../utils/generateArray";

import "./PlayerEntryView.scss";

const PlayerEntryView = () => {
  const [playersInput, setPlayersInput] = useState<string>("");
  const dispatch = useDispatch();
  
  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)
  const {changeView} = bindActionCreators(appActionCreators, dispatch);
  
  const players = playersInput.split("\n").filter(name => name !== "");

  const rightAmount = players.length > 0 && players.length % 4 === 0;

  const saveAndContinue = (): void => {
    addPlayers(players);
    changeView(Views.TableEntry);
  };

  return (
    <div>
      <p>Enter players, one per line. Currently {players.length} players.</p>
      <textarea
        value={playersInput}
        onChange={(e) => setPlayersInput(e.target.value)}
      />
      {
        !rightAmount &&
        <p>Must have a number of players that is divisible by 4.</p>
      }
      <p>
        <button
          disabled={!rightAmount}
          onClick={() => saveAndContinue()}>
          Save
        </button>
      </p>
    </div>
  );
};

export default PlayerEntryView;