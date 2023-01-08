import { BrowserRouter, Route, Routes } from "react-router-dom";
import useTournament from "./utils/hooks/useTournament";
import useAppState from "./utils/hooks/useAppState";
import TournametInfoEntry from "./views/NewTournament/TournamentInfoEntry";
import PlayerEntry from "./views/NewTournament/PlayerEntry";
import Overview from "./views/TournamentHub/Overview";
import Standings from "./views/TournamentHub/Standings";
import StandingsPopup from "./views/TournamentHub/Standings/StandingsPopup";
import PrintOuts from "./views/TournamentHub/PrintOuts";
import Entrance from "./views/Entrance";
import EditPlayers from "./views/TournamentHub/EditPlayers";
import PrintPersonalSchedules from "./views/Print/PrintPersonalSchedules";
import PrintReportCards from "./views/Print/PrintReportCards";
import PrintScoreForms from "./views/Print/PrintScoreForms";
import PrintFullSchedule from "./views/Print/PrintFullSchedule";
import FinalResults from "./views/TournamentHub/FinalResults";
import FinalResultsPopup from "./views/TournamentHub/FinalResults/FinalResultsPopup";
import ReportCards from "./views/TournamentHub/ReportCards";
import Ribbon from "./views/TournamentHub/Ribbon";

const App = () => {
	const appState = useAppState();
	const tournament = useTournament();

	if (!appState.tournamentLoaded)
	{
		return (
			<div className={"mahjongTournamentEngine"}>
				<BrowserRouter>
					<Routes>
						<Route path={"/print"}>
							<Route path={"personal-schedules"} element={<PrintPersonalSchedules/>}/>
							<Route path={"report-cards"} element={<PrintReportCards/>}/>
							<Route path={"score-forms"} element={<PrintScoreForms/>}/>
							<Route path={"full-schedule"} element={<PrintFullSchedule/>}/>
						</Route>
						<Route path={"/hub/standings/popup"} element={<StandingsPopup/>}/>
						<Route path={"/hub/final-results/popup"} element={<FinalResultsPopup/>}/>
						<Route path={"*"} element={<Entrance/>}/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	if (tournament.playerNames.length === 0)
	{
		return (
			<div className={"mahjongTournamentEngine"}>
				<BrowserRouter>
					<Routes>
						<Route index element={<TournametInfoEntry/>}/>
						<Route path={"/new"}>
							<Route index element={<TournametInfoEntry/>}/>
							<Route path={"basic"} element={<TournametInfoEntry/>}/>
							<Route path={"players"} element={<PlayerEntry/>}/>
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}

	return (
		<div className={"mahjongTournamentEngine"}>
			<BrowserRouter>
				<Ribbon/>
				<Routes>
					<Route path={"/hub"}>
						<Route index element={<Overview/>}/>
						<Route path={"overview"} element={<Overview/>}/>
						<Route path={"standings"} element={<Standings/>}/>
						<Route path={"print-outs"} element={<PrintOuts/>}/>
						<Route path={"edit-players"} element={<EditPlayers/>}/>
						<Route path={"final-results"} element={<FinalResults/>}/>
						<Route path={"report-cards"} element={<ReportCards/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;