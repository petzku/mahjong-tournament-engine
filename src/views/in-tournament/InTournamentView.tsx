import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import { PlayerName, PlayerId, Game, Standing } from "../../data-types/tournament-data-types";

import Standings from "../../components/Standings";
import FinalSeatingPlan from "../../components/FinalSeatingPlan";
import AddFinishedGame from "./AddFinishedGame/AddFinishedGame";

enum Views {
  AddFinishedGame,
  Standings,
  SeatingPlan
};

const InTournamentView = () => {
  const [view, setView] = useState<Views>(Views.SeatingPlan);
  //const dispatch = useDispatch();
  //const tournamentState = useSelector((state: State) => state.tournament);

  return (
    <div className={"in-tournament"}>
      <div className={"controls"}>
        <button onClick={() => setView(Views.AddFinishedGame)}>Add finished game</button>
        <button>Edit players</button>
        <button>Edit tables</button>
      </div>
      <div className={"view"}>
        <button onClick={() => setView(Views.Standings)}>View standings</button>
        <button onClick={() => setView(Views.SeatingPlan)}>View seating plan</button>
      </div>
      {
        view === Views.AddFinishedGame &&
        <AddFinishedGame
          onFinish={() => setView(Views.Standings)}
        />
      }
      {
        view === Views.Standings &&
        <Standings/>
      }
      {
        view === Views.SeatingPlan &&
        <FinalSeatingPlan/>
      }
    </div>
  )
};

export default InTournamentView;