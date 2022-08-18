import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { appActionCreators, State } from "../../state";
import download from "../../utils/download";

import Standings from "../../components/Standings";
import Schedule from "./Schedule";
import { Game } from "../../data-types/tournament-data-types";
import { Views } from "../../data-types/app-data-types";

enum Tabs {
  Standings,
  SeatingPlan
};

const TournamentHub = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);
  const [tab, setTab] = useState<Tabs>(Tabs.SeatingPlan);

  const { changeView } = bindActionCreators(appActionCreators, dispatch);

  const allFinished = !tournamentState.games.some((game: Game) => !game.finished);

  return (
    <div>
      <div>
        <button onClick={() => setTab(Tabs.Standings)}>View standings</button>
        <button onClick={() => setTab(Tabs.SeatingPlan)}>View schedule</button>
        <button onClick={() => download(tournamentState)}>Download data file</button>
      </div>
      {
        tab === Tabs.Standings &&
        <Standings/>
      }
      {
        tab === Tabs.SeatingPlan &&
        <Schedule/>
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