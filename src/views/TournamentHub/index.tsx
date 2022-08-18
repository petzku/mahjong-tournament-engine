import { useState } from "react";
import { useSelector } from "react-redux";

import { State } from "../../state";
import download from "../../utils/download";

import Standings from "../../components/Standings";
import Schedule from "./Schedule";

enum Views {
  Standings,
  SeatingPlan
};

const TournamentHub = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  const [view, setView] = useState<Views>(Views.SeatingPlan);

  return (
    <div>
      <div>
        <button onClick={() => setView(Views.Standings)}>View standings</button>
        <button onClick={() => setView(Views.SeatingPlan)}>View seating plan</button>
        <button onClick={() => download(tournamentState)}>Download data file</button>
      </div>
      {
        view === Views.Standings &&
        <Standings/>
      }
      {
        view === Views.SeatingPlan &&
        <Schedule/>
      }
    </div>
  )
};

export default TournamentHub;