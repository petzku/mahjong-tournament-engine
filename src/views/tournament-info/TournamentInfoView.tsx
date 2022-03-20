import {useState} from "react";
import { GeneralInfo } from "../../data-types/tournament-data-types";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import TextInput from "../../components/TextInput";
import NumberInput from "../../components/NumberInput";
import { Views } from "../../data-types/app-data-types";
import { initialState } from "../../state/reducers/tournamentReducer";

const TournamentInfoView = () => {
  const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
  const dispatch = useDispatch();
  const appState = useSelector((state: State) => state.app);

  const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch)
  const {changeView} = bindActionCreators(appActionCreators, dispatch);
  
  const onSave = (): void => {
    editTournamentInfo(currentInfo);
    changeView(Views.InTournament);
  };/*git bug force edit*/

  return (
    <div className={"tournament-info-view"}>
      <TextInput
        className={"asd"}
        label={"Tournament title"}
        value={currentInfo.title}
        onChange={(newValue: string): void => setCurrentInfo({...currentInfo, title: newValue})}
      />
      <TextInput
        className={"asd"}
        label={"Tournament location"}
        value={currentInfo.location}
        onChange={(newValue: string): void => setCurrentInfo({...currentInfo, location: newValue})}
      />
      <TextInput
        className={"asd"}
        label={"Tournament start"}
        value={currentInfo.start}
        onChange={(newValue: string): void => setCurrentInfo({...currentInfo, start: newValue})}
      />
      <TextInput
        className={"asd"}
        label={"Tournament end"}
        value={currentInfo.end}
        onChange={(newValue: string): void => setCurrentInfo({...currentInfo, end: newValue})}
      />
      <NumberInput
        className={"asd"}
        label={"Rounds"}
        value={currentInfo.rounds}
        onChange={(newValue: number): void => setCurrentInfo({...currentInfo, rounds: newValue})}
      />
      <NumberInput
        className={"asd"}
        label={"Oka"}
        value={currentInfo.oka}
        onChange={(newValue: number): void => setCurrentInfo({...currentInfo, oka: newValue})}
      />
      <NumberInput
        className={"asd"}
        label={"Uma (high)"}
        value={currentInfo.uma[0]}
        onChange={(newValue: number): void => setCurrentInfo({...currentInfo, uma: [newValue, currentInfo.uma[1]]})}
      />
      <NumberInput
        className={"asd"}
        label={"Uma (low)"}
        value={currentInfo.uma[1]}
        onChange={(newValue: number): void => setCurrentInfo({...currentInfo, uma: [currentInfo.uma[0], newValue]})}
      />
      <button onClick={() => onSave()}>Ready</button>
    </div>
  );
};

export default TournamentInfoView;