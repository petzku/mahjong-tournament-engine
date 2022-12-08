import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../state";
import HubTabs from "../HubTabs";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import StandingsTable from "../../../components/StandingsTable";
import { generateArray } from "../../../utils/generateArray";
import TextInput from "../../../components/TextInput";

const Standings = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  const [afterRound, setAfterRound] = useState<number>(tournamentState.info.rounds - 1);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [standingsWindow, setStandingsWindow] = useState<WindowProxy | null>(null);

  const openWindow = () => {
    setStandingsWindow(window.open(
      `/hub/standings/popup?afterRound=${afterRound}&message=${popupMessage}`,
      "standingsWindow",
      "width=500,height=500"
    ));
  };

  const roundOptions = generateArray(tournamentState.info.rounds).map((roundId: number): DropdownItem => ({
    value: roundId,
    text: `Round ${roundId + 1}`
  }));

  return (
    <div>
      <HubTabs/>
      <Dropdown
        label={"Show standings after round"}
        items={roundOptions}
        value={afterRound}
        onChange={(newValue) => setAfterRound(newValue)}
      />
      <TextInput
        label={"Set a message to show in the popup (e.g. time of the next round)"}
        value={popupMessage}
        onChange={(newValue) => setPopupMessage(newValue)}
      />
      <button onClick={() => openWindow()}>Open in popup.</button>
      <StandingsTable
        tournament={tournamentState}
        afterRound={afterRound}
      />
    </div>
  );
};

export default Standings;