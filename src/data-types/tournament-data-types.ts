export type GeneralInfo = {
  title: string,
  location: string,
  start: string,
  end: string,
  rounds: number,
  oka: number,
  uma: [number, number]
};

export type PlayerName = string;

export type PlayerId = number;

/* export type PlayerPoints = {
  player: Player,
  points: number
}; */

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
  playerId: PlayerId,
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
  playerNames: PlayerName[],
  tables: Table[],
  games: Game[]
};

export type Standing = {
  playerId: PlayerId,
  points: number
};