import { Tournament } from "../data-types/tournament-data-types";

export enum Routes {
  TournamentInfoEntry = "/new/basic",
  PlayerEntry = "/new/players",
  TableEntry = "/new/tables",
  Schedule = "/hub/schedule",
  Standings = "/hub/standings",
  PlayerSchedules = "/hub/playerschedules",
  TableSchedules = "/hub/tableschedules",
  PostTournament = "/post",
  Ceremony = "/post/ceremony",
  ReportCards = "/post/reportcards"
};

export type Route = Routes;

export const findRoute = (loaded: Tournament): Route => {
  //If the loaded tournament has names and tables, take the app to tournament hub.
  if (loaded.playerNames.length > 0 && loaded.tables.length > 0)
  {
    return Routes.Schedule;
  }

  //If the loaded tournament has names but no tables, take the app to table entry phase.
  if (loaded.playerNames.length > 0 && loaded.tables.length === 0)
  {
    return Routes.TableEntry;
  }

  //If the loaded tournament has no names, take the app to player entry phase.
  if (loaded.playerNames.length === 0)
  {
    return Routes.PlayerEntry;
  }

  //Otherwise take the app the tournament info entry view.
  return Routes.TournamentInfoEntry;
};