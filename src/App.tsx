import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./state"; 
import { Views } from "./types/app-types";

import TournamentInfoView from "./views/tournament-info/TournamentInfoView";
import PlayerEntryView from "./views/player-entry/PlayerEntryView";

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
        <div>
          <p>input tables</p>
          {/* <button onClick={() => changeView(Views.Hub)}>go forth</button> */}
        </div>
      }
      {
        appState.view === Views.Hub &&
        <div>
          <p>tournament hub</p>
        </div>
      }
    </div>
  );
}

export default App;