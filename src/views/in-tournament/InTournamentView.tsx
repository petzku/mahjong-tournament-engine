import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import { PlayerName, PlayerId, Game, Standing } from "../../data-types/tournament-data-types";

import Standings from "../../components/Standings";
import SeatingPlan from "../../components/SeatingPlan";

enum Views {
  Standings,
  SeatingPlan
};

const InTournamentView = () => {
  const [view, setView] = useState<Views>(Views.SeatingPlan);
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  return (
    <div className={"in-tournament"}>
      <div className={"controls"}>
        <button>Add finished game</button>
        <button>Edit players</button>
        <button>Edit tables</button>
      </div>
      <div className={"view"}>
        <button onClick={() => setView(Views.Standings)}>View standings</button>
        <button onClick={() => setView(Views.SeatingPlan)}>View seating plan</button>
      </div>
      {
        view === Views.Standings &&
        <Standings/>
      }
      {
        view === Views.SeatingPlan &&
        <SeatingPlan/>
      }
    </div>
  )
};

export default InTournamentView;