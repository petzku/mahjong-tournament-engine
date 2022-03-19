export enum Views {
  TournamentInfoEntry,
  PlayerEntry,
  TableEntry,
  InTournament,
  PostTournament
};

export type View = Views;

export type App = {
  view: View
};