import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Popup from "../../../components/Popup";
import { PlayerName } from "../../../data-types/tournament-data-types";
import { tournamentActionCreators } from "../../../state";
import { Routes } from "../../../utils/routeUtils";

import styles from "./PlayerEntryView.module.css";

const PlayerEntryView = () => {
  const [playersInput, setPlayersInput] = useState<string>("");
  const [duplicates, setDuplicates] = useState<PlayerName[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)
  
  const players: PlayerName[] = playersInput.split("\n").filter(name => name !== "");

  const rightAmount = players.length > 0 && players.length % 4 === 0;

  const saveAndContinue = (): void => {
    const duplicatesFromInput = players.filter((name: PlayerName, index: number) => players.indexOf(name) !== index);

    if (duplicatesFromInput.length > 0)
    {
      setDuplicates(duplicatesFromInput);
      return;
    }

    addPlayers(players.sort((a: PlayerName, b: PlayerName) => Math.random() - 0.5));
    navigate(Routes.TableEntry);
  };

  return (
    <div>
      {
        duplicates.length > 0 &&
        <Popup
          title={"Duplicate players"}
          cancelHidden={true}
          cancelText={""}
          onCancel={() => {}}
          confirmText={"Ok"}
          onConfirm={(): void => setDuplicates([])}>
          <p>Please add some uniqueness (e.g. middle initial, nickname or city) to the names of these players:</p>
          <ul>
            {
              duplicates.map((name: PlayerName) => <li key={`duplicate-${name}`}>{name}</li>)
            }
          </ul>
        </Popup>
      }
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