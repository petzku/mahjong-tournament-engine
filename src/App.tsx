import TournamentInfoView from "./views/NewTournament/TournamentInfoEntry";
import PlayerEntryView from "./views/NewTournament/PlayerEntry";
import TableEntryView from "./views/NewTournament/TableEntry";
import PostTournament from "./views/PostTournament";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./views/TournamentHub/Schedule";
import Standings from "./views/TournamentHub/Standings";
import PlayerSchedules from "./views/TournamentHub/PlayerSchedules";
import TableSchedules from "./views/TournamentHub/TableSchedules";
import { useSelector } from "react-redux";
import { State } from "./state";
import OfferStoredGame from "./views/OfferStoredGame";

const App = () => {
  const appState = useSelector((state: State) => state.app);

  return (
    <div className={"mahjong-tournament-engine"}>
      <BrowserRouter>
        <Routes>
          {
            !appState.tournamentLoaded
            ?
            <Route path={"*"} element={<OfferStoredGame/>}/>
            :
            <>
              <Route index element={<TournamentInfoView/>}/>
              <Route path={"/new"}>
                <Route index element={<TournamentInfoView/>}/>
                <Route path={"basic"} element={<TournamentInfoView/>}/>
                <Route path={"players"} element={<PlayerEntryView/>}/>
                <Route path={"tables"} element={<TableEntryView/>}/>
              </Route>
              <Route path={"/hub"}>
                <Route index element={<Schedule/>}/>
                <Route path={"schedule"} element={<Schedule/>}/>
                <Route path={"standings"} element={<Standings/>}/>
                <Route path={"playerschedules"} element={<PlayerSchedules/>}/>
                <Route path={"tableschedules"} element={<TableSchedules/>}/>
              </Route>
              <Route path={"/post"} element={<PostTournament/>}/>
            </>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;