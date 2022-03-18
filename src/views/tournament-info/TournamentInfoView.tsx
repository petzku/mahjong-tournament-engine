import {useState} from "react";
import { GeneralInfo } from "../../types/tournament-types";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import TextInput from "../../components/TextInput";
import NumberInput from "../../components/NumberInput";
import { Views } from "../../types/app-types";

const TournamentInfoView = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    title: "",
    location: "",
    start: "",
    end: "",
    oka: 0,
    uma: [15, 5]
  });
  const dispatch = useDispatch();
  const appState = useSelector((state: State) => state.app);

  const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch)
  const {changeView} = bindActionCreators(appActionCreators, dispatch);
  
  const onSave = (): void => {
    editTournamentInfo(generalInfo);
    changeView(Views.PlayerEntry);
  };

  return (
    <div className={"tournament-info-view"}>
      <TextInput
        className={"asd"}
        label={"Tournament title"}
        value={generalInfo.title}
        onChange={(newTitle: string): void => setGeneralInfo({...generalInfo, title: newTitle})}
      />
      <TextInput
        className={"asd"}
        label={"Tournament location"}
        value={generalInfo.location}
        onChange={(newLocation: string): void => setGeneralInfo({...generalInfo, location: newLocation})}
      />
      <TextInput
        className={"asd"}
        label={"Tournament start"}
        value={generalInfo.start}
        onChange={(newStart: string): void => setGeneralInfo({...generalInfo, start: newStart})}
      />
      <TextInput
        className={"asd"}
        label={"Tournament end"}
        value={generalInfo.end}
        onChange={(newEnd: string): void => setGeneralInfo({...generalInfo, end: newEnd})}
      />
      <NumberInput
        className={"asd"}
        label={"Oka"}
        value={generalInfo.oka}
        onChange={(newOka: number): void => setGeneralInfo({...generalInfo, oka: newOka})}
      />
      <NumberInput
        className={"asd"}
        label={"Uma (high)"}
        value={generalInfo.uma[0]}
        onChange={(newHighUma: number): void => setGeneralInfo({...generalInfo, uma: [newHighUma, generalInfo.uma[1]]})}
      />
      <NumberInput
        className={"asd"}
        label={"Uma (low)"}
        value={generalInfo.uma[1]}
        onChange={(newLowUma: number): void => setGeneralInfo({...generalInfo, uma: [generalInfo.uma[0], newLowUma]})}
      />
      <button onClick={() => onSave()}>Ready</button>
    </div>
  );
};

export default TournamentInfoView;