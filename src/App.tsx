import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./state"; 
import { Views } from "./data-types/app-data-types";

import TournamentInfoView from "./views/TournamentInfoEntry/TournamentInfoEntry";
import PlayerEntryView from "./views/PlayerEntry/PlayerEntryView";
import TableEntryView from "./views/TableEntry/TableEntry";
import EditSeatingPlan from "./views/EditSeatingPlan/EditSeatingPlan";
import InTournamentView from "./views/TournamentHub/TournamentHub";

const App = () => {
  /* const dispatch = useDispatch(); */

  //const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch)
  /* const {changeView} = bindActionCreators(appActionCreators, dispatch); */
  const appState = useSelector((state: State) => state.app);

  return (
    <div className={"mahjong-tournament-engine"}>
      {
        appState.view === Views.TournamentInfoEntry &&
        <TournamentInfoView/>
      }
      {
        appState.view === Views.PlayerEntry &&
        <PlayerEntryView/>
      }
      {
        appState.view === Views.TableEntry &&
        <TableEntryView/>
      }
      {
        appState.view === Views.EditSeatingPlan &&
        <EditSeatingPlan/>
      }
      {
        appState.view === Views.InTournament &&
        <InTournamentView/>
      }
      {
        appState.view === Views.PostTournament &&
        <div>
          <p>final results and shit</p>
        </div>
      }
    </div>
  );
}

export default App;