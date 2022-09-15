import { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import { Row } from "read-excel-file/types";
import { bindActionCreators } from "redux";
import Popup from "../../../components/Popup";
import { State, tournamentActionCreators } from "../../../state";
import { convertTemplate } from "../../../utils/convertTemplate";
import { generateSeating } from "../../../utils/generateSeating";
import { Routes } from "../../../utils/routeUtils";

import styles from "./PlayerEntryView.module.css";
import TemplateHelp from "./TemplateHelp";

const PlayerEntryView = () => {
  const [showTemplateHelp, setShowTemplateHelp] = useState<boolean>(false);
  const [playersInput, setPlayersInput] = useState<string>("");
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const tournamentState = useSelector((state: State) => state.tournament);
  const {addPlayers, addSeatingTemplate} = bindActionCreators(tournamentActionCreators, dispatch)
  
  const players: string[] = playersInput.split("\n").filter(name => name !== "");

  const rightAmount = players.length > 0 && players.length % 4 === 0;

  const save = (): void => {
    //Check for duplicates, notify if they exist and don't save names yet.
    const duplicatesFromInput = players.filter((name: string, index: number) => players.indexOf(name) !== index);

    if (duplicatesFromInput.length > 0)
    {
      setDuplicates(duplicatesFromInput);
      return;
    }

    //If we didn't set a custom seating template, use a generated one.
    if (tournamentState.seatingTemplate.length === 0)
    {
      addSeatingTemplate(generateSeating({
        roundCount: tournamentState.info.rounds,
        tableCount: players.length / 4,
        playerCount: players.length
      }));
    }

    addPlayers(players.sort((a: string, b: string) => Math.random() - 0.5));
    navigate(Routes.TableEntry);
  };

  const readTemplateFile = (files: FileList | null) => {
    if (files === null || files.length === 0)
    {
      return;
    }

    readXlsxFile(files[0]).then((excelRows: Row[]) => {
      addSeatingTemplate(convertTemplate(excelRows));
    });
  };

  return (
    <div>
      <h1>Enter players</h1>
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
              duplicates.map((name: string) => <li key={`duplicate-${name}`}>{name}</li>)
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
      <h2>Seating template</h2>
      <p>To use a seating template, upload one here: <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => readTemplateFile(e.target.files)}/> <button onClick={() => setShowTemplateHelp(true)}>(help)</button></p>
      <p>If you don't upload a template, an algithmically generated seating will be used. Note that the current version of Mahjong Tournament Engine does not generate good seatings.</p>
      <p>
        <button
          disabled={!rightAmount}
          onClick={() => save()}>
          Save
        </button>
      </p>
      {
        showTemplateHelp &&
        <TemplateHelp
          onClose={() => setShowTemplateHelp(false)}
        />
      }
    </div>
  );
};

export default PlayerEntryView;