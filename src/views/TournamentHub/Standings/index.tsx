import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../state";
import Dropdown, {DropdownItem} from "../../../components/Dropdown";
import StandingsTable from "../../../components/StandingsTable";
import { generateArray } from "../../../utils/generateArray";
import { Game, Tournament } from "../../../data-types/tournament-data-types";
import Toggle from "../../../components/Toggle";

const Standings = () => {
  const getLastFinishedRound = (tournament: Tournament): number => {
    const getGamesOfRound = (roundId: number) => tournamentState.games.filter((game: Game) => game.round === roundId);
    const isRoundUnfinished = (roundId: number) => getGamesOfRound(roundId).some((game: Game): boolean => !game.finished);
    
    const rounds = generateArray(tournamentState.info.rounds);
    const firstUnfinishedRound = rounds.findIndex((roundId: number): boolean => isRoundUnfinished(roundId));
    
    if (firstUnfinishedRound === 0)
    {
      return 0;
    }

    return (firstUnfinishedRound === -1 ? tournament.info.rounds : firstUnfinishedRound) - 1;    
  };

  const [standingsWindow, setStandingsWindow] = useState<WindowProxy | null>(null);
  const tournamentState = useSelector((state: State) => state.tournament);
    
  const [afterRound, setAfterRound] = useState<number>(getLastFinishedRound(tournamentState));
  const [plainText, setPlainText] = useState<boolean>(false);

  const openWindow = () => {
    setStandingsWindow(window.open(
      `/hub/standings/popup?afterRound=${afterRound}&plainText=${plainText.toString()}`,
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
      <Toggle
        true={"Plain text"}
        false={"Formatted table"}
        value={plainText}
        onSwitch={() => setPlainText(!plainText)}
      />
      <Dropdown
        id={"roundSelection"}
        label={"Show standings after round"}
        items={roundOptions}
        value={afterRound}
        onChange={(newValue) => setAfterRound(newValue)}
      />
      <button onClick={() => openWindow()}>Open in popup.</button>
      <StandingsTable
        tournament={tournamentState}
        afterRound={afterRound}
        plainText={plainText}
      />
    </div>
  );
};

export default Standings;