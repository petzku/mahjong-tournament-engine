import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators} from "../../state";

import { Game } from "../../data-types/tournament-data-types";
import { Views } from "../../data-types/app-data-types";

import EditableSeatingPlan from "./EditableSeatingPlan";

const EditSeatingPlan = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);
  const {addGames} = bindActionCreators(tournamentActionCreators, dispatch);
  const {changeView} = bindActionCreators(appActionCreators, dispatch);

  const saveAndContinue = (newGames: Game[]) => {
    addGames(newGames);
    changeView(Views.InTournament);
  };

  return (
    <div className={"in-tournament"}>
      <h1>You can tweak the seating plan if you find it unsatisfactory.</h1>
      
      <EditableSeatingPlan
        games={tournamentState.games}
        onSave={(newGames: Game[]) => saveAndContinue(newGames)}
      />
    </div>
  )
};

export default EditSeatingPlan;