import { useSelector } from "react-redux";
import { State} from "./state"; 
import { Views } from "./data-types/app-data-types";

import TournamentInfoView from "./views/TournamentInfoEntry";
import PlayerEntryView from "./views/PlayerEntry";
import TableEntryView from "./views/TableEntry";
import TournamentHub from "./views/TournamentHub";

const App = () => {
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
        <TournamentHub/>
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