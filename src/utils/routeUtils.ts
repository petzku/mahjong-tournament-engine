import { Tournament } from "../data-types/tournament-data-types";

export enum Routes {
  TournamentInfoEntry = "/new/basic",
  PlayerEntry = "/new/players",
  Overview = "/hub/overview",
  Standings = "/hub/standings",
  StandingsPopup = "/hub/standings/popup",
  PrintOuts = "/hub/print-outs",
  EditPlayers = "/hub/edit-players",
  FinalResults = "/hub/final-results",
  ReportCards = "/hub/report-cards",
  FullSchedule = "/print/full-schedule",
  PrintPersonalSchedules = "/print/personal-schedules",
  PrintReportCards = "/print/report-cards",
  PrintScoreForms = "/print/score-forms",
  PostTournament = "/post",
  Ceremony = "/post/ceremony",
};

export type Route = Routes;

export const findRoute = (loaded: Tournament): Route => {
  //If the loaded tournament has names, take the app to tournament hub.
  if (loaded.playerNames.length > 0)
  {
    return Routes.Overview;
  }

  //If the loaded tournament has no names, take the app to player entry phase.
  if (loaded.playerNames.length === 0)
  {
    return Routes.PlayerEntry;
  }

  //Otherwise take the app the tournament info entry view.
  return Routes.TournamentInfoEntry;
};