import { ChangeEvent, useState } from "react";
import { GeneralInfo, isTournamentDataValid, Tournament } from "../../../data-types/tournament-data-types";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, appActionCreators, State } from "../../../state";

import TextInput from "../../../components/TextInput";
import NumberInput from "../../../components/NumberInput";
import { initialState } from "../../../state/reducers/tournamentReducer";
import { findRoute } from "../../../utils/findRoute";
import { useNavigate } from "react-router-dom";
import OfferStoredGame from "../../OfferStoredGame";

const TournamentInfoView = () => {
  const appState = useSelector((state: State) => state.app);
  const navigate = useNavigate();
  const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
  const dispatch = useDispatch();

  const {setTournament, editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch);
  const {markTournamentLoaded} = bindActionCreators(appActionCreators, dispatch);
  
  const onSave = (): void => {
    editTournamentInfo(currentInfo);
    navigate("/new/players");
  };

  const offerStoredGame = (() => {
    if (!appState.tournamentLoaded && localStorage.getItem("mahjong-tournament") !== null)
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

  const readFile = (files: FileList | null): void => {
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

  return (
    <div>
      {
        offerStoredGame &&
        <OfferStoredGame/>
      }
      <div>
        <p>Start new tournament</p>
        <TextInput
          label={"Tournament title"}
          value={currentInfo.title}
          onChange={(newValue: string): void => setCurrentInfo({...currentInfo, title: newValue})}
        />
        <TextInput
          label={"Tournament location"}
          value={currentInfo.location}
          onChange={(newValue: string): void => setCurrentInfo({...currentInfo, location: newValue})}
        />
        <TextInput
          label={"Tournament start"}
          value={currentInfo.start}
          onChange={(newValue: string): void => setCurrentInfo({...currentInfo, start: newValue})}
        />
        <TextInput
          label={"Tournament end"}
          value={currentInfo.end}
          onChange={(newValue: string): void => setCurrentInfo({...currentInfo, end: newValue})}
        />
        <NumberInput
          label={"Rounds"}
          value={currentInfo.rounds}
          onChange={(newValue: number): void => setCurrentInfo({...currentInfo, rounds: newValue})}
          steps={[1]}
        />
        <NumberInput
          label={"Oka"}
          value={currentInfo.oka}
          onChange={(newValue: number): void => setCurrentInfo({...currentInfo, oka: newValue})}
          steps={[1]}
        />
        <button onClick={() => onSave()}>Ready</button>
      </div>
      <p>or</p>
      <div>
        <p>load locally saved tournament file: <input type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => readFile(e.target.files)}/></p>
      </div>
    </div>
  );
};

export default TournamentInfoView;