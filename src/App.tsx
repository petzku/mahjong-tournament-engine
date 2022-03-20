import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./state"; 
import { Views } from "./data-types/app-data-types";

import TournamentInfoView from "./views/tournament-info/TournamentInfoView";
import PlayerEntryView from "./views/player-entry/PlayerEntryView";
import TableEntryView from "./views/table-entry/TableEntryView";
import InTournamentView from "./views/in-tournament/InTournamentView";

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