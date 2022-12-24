import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, appActionCreators } from "../../state";
import { isTournamentDataValid, Tournament } from "../../data-types/tournament-data-types";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./Entrance.module.css";
import { findRoute, Routes } from "../../utils/routeUtils";
import React, { ChangeEvent, useRef } from "react";
import download from "../../utils/download";

const Entrance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);

  const { markTournamentLoaded } = bindActionCreators(appActionCreators, dispatch);
  const { setTournament } = bindActionCreators(tournamentActionCreators, dispatch);

  const offerStoredGame = (() => {
    if (localStorage.getItem("mahjong-tournament") !== null)
    {
      const readFromLocalStorage: string = localStorage.getItem("mahjong-tournament") as string;

      try
      {
        const possibleTournamentState: Tournament = JSON.parse(readFromLocalStorage);

        return isTournamentDataValid(possibleTournamentState);
      }
      catch (e)
      {
        console.log("error", e);
        return false;
      }
    }

    return false;
  })();

  const startNewTournament = () => {
    localStorage.removeItem("mahjong-tournament");
    markTournamentLoaded(true);
    navigate(Routes.TournamentInfoEntry);
  };

  const loadFromLocalStorage = () => {
    const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
    const view = findRoute(tournament);
    markTournamentLoaded(true);
    setTournament(tournament);
    navigate(view);
  };

	const openFileSelection = () => {
		if (fileInputRef !== null && fileInputRef.current !== null)
		{
			fileInputRef.current.click();
		}
	};

	const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) =>
		loadFromFile(e.target.files);

  const loadFromFile = (files: FileList | null) => {
    if (files === null || files.length === 0)
    {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const tournament: Tournament = JSON.parse(fileReader.result as string);
      const view = findRoute(tournament);
      setTournament(tournament);
      markTournamentLoaded(true);
      navigate(view);
    };
    fileReader.readAsText(files[0]);
  };

	const saveTournamentToFile = () => {
		download(JSON.parse(localStorage.getItem("mahjong-tournament") as string));
	};

  return (
    <div className={styles.entrance}>
			<div>
				<div className={styles.buttonContainer}>
					<Button
						className={styles.button}
						label={"Start new tournament"}
						subLabel={`${offerStoredGame ? "Tournament stored in memory will be wiped out." : ""}`}
						onClick={() => startNewTournament()}
					/>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						className={styles.button}
						label={"Open tournament file"}
						onClick={() => openFileSelection()}
					/>
				</div>
				{
					offerStoredGame &&
					<React.Fragment>
						<div className={styles.buttonContainer}>
							<Button
								className={styles.button}
								label={"Load tournament from memory"}
								subLabel={"There seems to be a tournament stored in browser storage."}
								onClick={() => loadFromLocalStorage()}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<Button
								className={styles.button}
								label={"Save tournament to file"}
								subLabel={"The tournament stored in browser storage."}
								onClick={() => saveTournamentToFile()}
							/>
						</div>
					</React.Fragment>
				}
			</div>
			<div className={styles.loadFile}>
				<input
					ref={fileInputRef}
					type="file"
					onChange={fileInputOnChange}
				/>
			</div>
    </div>
  );
};

export default Entrance;