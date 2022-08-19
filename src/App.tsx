import { useSelector } from "react-redux";
import { State } from "./state"; 

import { Views } from "./data-types/app-data-types";
import { Tournament, isTournamentDataValid } from "./data-types/tournament-data-types";

import TournamentInfoView from "./views/TournamentInfoEntry";
import PlayerEntryView from "./views/PlayerEntry";
import TableEntryView from "./views/TableEntry";
import TournamentHub from "./views/TournamentHub";
import OfferStoredGame from "./views/OfferStoredGame";
import PostTournament from "./views/PostTournament";

const App = () => {
  const appState = useSelector((state: State) => state.app);

  const offerStoredGame = (() => {
    if (!appState.tournamentLoaded && localStorage.getItem("mahjong-tournament") !== null)
    {
      const readFromLocalStorage: string = localStorage.getItem("mahjong-tournament") as string;

      try
      {
        const possibleTournamentState: Tournament = JSON.parse(readFromLocalStorage);

        return isTournamentDataValid(possibleTournamentState);
      }
      catch (e)
      {
        console.log("error", e);
        return false;
      }
    }

    return false;
  })();

  if (offerStoredGame)
  {
    return (
      <div className={"mahjong-tournament-engine"}>
        {
          offerStoredGame &&
          <OfferStoredGame/>
        }
      </div>
    );
  }

  return (
    <div className={"mahjong-tournament-engine"}>
      {
        appState.view === Views.TournamentInfoEntry &&
        <TournamentInfoView/>
      }
      {
        appState.view === Views.PlayerEntry &&
        <PlayerEntryView/>
      }
      {
        appState.view === Views.TableEntry &&
        <TableEntryView/>
      }
      {
        appState.view === Views.InTournament &&
        <TournamentHub/>
      }
      {
        appState.view === Views.PostTournament &&
        <PostTournament/>
      }
    </div>
  );
}

export default App;