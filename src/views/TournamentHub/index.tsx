import { useState } from "react";

import Standings from "../../components/Standings";
import FinalSeatingPlan from "./FinalSeatingPlan";
import AddFinishedGame from "./AddFinishedGame";

enum Views {
  AddFinishedGame,
  Standings,
  SeatingPlan
};

const TournamentHub = () => {
  const [view, setView] = useState<Views>(Views.SeatingPlan);

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

export default TournamentHub;