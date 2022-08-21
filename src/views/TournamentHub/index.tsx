import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { appActionCreators, State } from "../../state";
import download from "../../utils/download";

import Standings from "./Standings";
import Schedule from "./Schedule";
import PlayerSchedules from "./PlayerSchedules";
import TableSchedules from "./TableSchedules";
import { Game } from "../../data-types/tournament-data-types";
import { Views } from "../../data-types/app-data-types";

enum Tabs {
  Standings,
  TournamentSchedule,
  PlayerSchedules,
  TableSchedules
};

const TournamentHub = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);
  const [tab, setTab] = useState<Tabs>(Tabs.TournamentSchedule);

  const { changeView } = bindActionCreators(appActionCreators, dispatch);

  const allFinished = !tournamentState.games.some((game: Game) => !game.finished);

  return (
    <div>
      <div>
        <button onClick={() => setTab(Tabs.Standings)}>View standings</button>
        <button onClick={() => setTab(Tabs.TournamentSchedule)}>Tournament schedule</button>
        <button onClick={() => setTab(Tabs.PlayerSchedules)}>Player schedules</button>
        <button onClick={() => setTab(Tabs.TableSchedules)}>Table schedules</button>
      </div>
      <div>
        <button onClick={() => download(tournamentState)}>Download data file</button>
      </div>
      {
        tab === Tabs.Standings &&
        <Standings/>
      }
      {
        tab === Tabs.TournamentSchedule &&
        <Schedule/>
      }
      {
        tab === Tabs.PlayerSchedules &&
        <PlayerSchedules/>
      }
      {
        tab === Tabs.TableSchedules &&
        <TableSchedules/>
      }
      {
        allFinished &&
        <div>
          <button onClick={() => changeView(Views.PostTournament)}>Enter post-tournament ceremony</button>
        </div>
      }
    </div>
  )
};

export default TournamentHub;