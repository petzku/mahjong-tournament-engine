export enum Views {
  TournamentInfoEntry,
  PlayerEntry,
  TableEntry,
  Hub
};

export type View = Views;

export type App = {
  view: View
};