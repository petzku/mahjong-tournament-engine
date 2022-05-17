export enum Views {
  TournamentInfoEntry,
  PlayerEntry,
  TableEntry,
  EditSeatingPlan,
  InTournament,
  PostTournament
};

export type View = Views;

export type App = {
  view: View
};