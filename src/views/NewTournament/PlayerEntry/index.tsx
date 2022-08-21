import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import { Routes } from "../../../utils/findRoute";

import styles from "./PlayerEntryView.module.css";

const PlayerEntryView = () => {
  const [playersInput, setPlayersInput] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)
  
  const players = playersInput.split("\n").filter(name => name !== "");

  const rightAmount = players.length > 0 && players.length % 4 === 0;

  const saveAndContinue = (): void => {
    addPlayers(players);
    navigate(Routes.TableEntry);
  };

  return (
    <div>
      <p>Enter players, one per line. Currently {players.length} players.</p>
      <textarea
        className={styles.playerEntry}
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