export type GeneralInfo = {
  title: string,
  location: string,
  start: string,
  end: string,
  oka: number,
  uma: [number, number]
};

export type Player = string;

export type PointSticks = {
  tenThousand: number,
  fiveThousand: number,
  oneThousand: number,
  fiveHundred: number,
  oneHundred: number
};

export type Table = {
  setOwner: string,
  matOwner: string,
  notes: string,
  pointSticks: PointSticks
};

export type Seat = {
  player: number,
  points: number
};

export type GameScore = {
  east: Seat,
  south: Seat,
  west: Seat,
  north: Seat
};

export type Game = {
  round: number,
  table: number,
  finished: boolean,
  score: GameScore
};

export type Tournament = {
  info: GeneralInfo,
  players: Player[],
  tables: Table[],
  games: Game[]
};