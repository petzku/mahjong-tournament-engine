import { View, Views } from "../data-types/app-data-types";
import { Tournament } from "../data-types/tournament-data-types";

export const loadTournament = (loaded: Tournament): View => {
  //If the loaded tournament has names and tables, take the app to tournament hub.
  if (loaded.playerNames.length > 0 && loaded.tables.length > 0)
  {
    return Views.InTournament;
  }

  //If the loaded tournament has names but no tables, take the app to table entry phase.
  if (loaded.playerNames.length > 0 && loaded.tables.length === 0)
  {
    return Views.TableEntry;
  }

  //If the loaded tournament has no names, take the app to player entry phase.
  if (loaded.playerNames.length === 0)
  {
    return Views.PlayerEntry;
  }

  //Otherwise take the app the tournament info entry view.
  return Views.TournamentInfoEntry;
};