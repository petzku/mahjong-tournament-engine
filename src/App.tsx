import TournamentInfoView from "./views/NewTournament/TournamentInfoEntry";
import PlayerEntryView from "./views/NewTournament/PlayerEntry";
import TableEntryView from "./views/NewTournament/TableEntry";
import PostTournament from "./views/PostTournament";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./views/TournamentHub/Schedule";
import Standings from "./views/TournamentHub/Standings";
import PrintOuts from "./views/TournamentHub/PrintOuts";
import { useSelector } from "react-redux";
import { State } from "./state";
import OfferStoredGame from "./views/OfferStoredGame";
import Ceremony from "./views/PostTournament/Ceremony";
import ReportCards from "./views/PostTournament/ReportCards";
import EditPlayers from "./views/TournamentHub/EditPlayers";
import PrintPersonalSchedules from "./views/Print/PrintPersonalSchedules";
import PrintTableSigns from "./views/Print/PrintTableSigns";
import EditTables from "./views/TournamentHub/EditTables";
import PrintReportCards from "./views/Print/PrintReportCards";
import PrintScoreForms from "./views/Print/PrintScoreForms";
import PrintFullSchedule from "./views/Print/PrintFullSchedule";

const App = () => {
  const appState = useSelector((state: State) => state.app);

  return (
    <div className={"mahjong-tournament-engine"}>
      <BrowserRouter>
        <Routes>
          {
            !appState.tournamentLoaded
            ?
            <>
              <Route path={"/post/ceremony"} element={<Ceremony/>}/>
              <Route path={"/print"}>
                <Route path={"tablesigns"} element={<PrintTableSigns/>}/>
                <Route path={"personalschedules"} element={<PrintPersonalSchedules/>}/>
                <Route path={"reportcards"} element={<PrintReportCards/>}/>
                <Route path={"scoreforms"} element={<PrintScoreForms/>}/>
                <Route path={"fullschedule"} element={<PrintFullSchedule/>}/>
              </Route>
              <Route path={"*"} element={<OfferStoredGame/>}/>
            </>
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
                <Route path={"printouts"} element={<PrintOuts/>}/>
                <Route path={"editplayers"} element={<EditPlayers/>}/>
                <Route path={"edittables"} element={<EditTables/>}/>
              </Route>
              <Route path={"/post"}>
                <Route index element={<PostTournament/>}/>
                <Route path={"reportcards"} element={<ReportCards/>}/>
              </Route>
            </>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;