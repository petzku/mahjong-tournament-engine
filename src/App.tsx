import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "./state";

import TournamentInfoView from "./views/NewTournament/TournamentInfoEntry";
import PlayerEntryView from "./views/NewTournament/PlayerEntry";
import TableEntryView from "./views/NewTournament/TableEntry";
import Schedule from "./views/TournamentHub/Schedule";
import Standings from "./views/TournamentHub/Standings";
import StandingsPopup from "./views/TournamentHub/Standings/StandingsPopup";
import PrintOuts from "./views/TournamentHub/PrintOuts";
import OfferStoredGame from "./views/OfferStoredGame";
import EditPlayers from "./views/TournamentHub/EditPlayers";
import PrintPersonalSchedules from "./views/Print/PrintPersonalSchedules";
import PrintTableSigns from "./views/Print/PrintTableSigns";
import EditTables from "./views/TournamentHub/EditTables";
import PrintReportCards from "./views/Print/PrintReportCards";
import PrintScoreForms from "./views/Print/PrintScoreForms";
import PrintFullSchedule from "./views/Print/PrintFullSchedule";
import FinalResults from "./views/TournamentHub/FinalResults";
import FinalResultsPopup from "./views/TournamentHub/FinalResults/FinalResultsPopup";
import ReportCards from "./views/TournamentHub/ReportCards";
import Ribbon from "./views/TournamentHub/Ribbon";

const App = () => {
  const appState = useSelector((state: State) => state.app);

  if (!appState.tournamentLoaded)
  {
    return (
      <div className={"mahjong-tournament-engine"}>
        <BrowserRouter>
          <Routes>
            <Route path={"/print"}>
              <Route path={"table-signs"} element={<PrintTableSigns/>}/>
              <Route path={"personal-schedules"} element={<PrintPersonalSchedules/>}/>
              <Route path={"report-cards"} element={<PrintReportCards/>}/>
              <Route path={"score-forms"} element={<PrintScoreForms/>}/>
              <Route path={"full-schedule"} element={<PrintFullSchedule/>}/>
            </Route>
            <Route path={"/hub/standings/popup"} element={<StandingsPopup/>}/>
            <Route path={"/hub/final-results/popup"} element={<FinalResultsPopup/>}/>
            <Route path={"*"} element={<OfferStoredGame/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className={"mahjong-tournament-engine"}>
      <BrowserRouter>
        <Ribbon/>
        <Routes>
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
            <Route path={"print-outs"} element={<PrintOuts/>}/>
            <Route path={"edit-players"} element={<EditPlayers/>}/>
            <Route path={"edit-tables"} element={<EditTables/>}/>
            <Route path={"final-results"} element={<FinalResults/>}/>
            <Route path={"report-cards"} element={<ReportCards/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;