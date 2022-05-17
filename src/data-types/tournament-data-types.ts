export type GeneralInfo = {
  title: string,
  location: string,
  start: string,
  end: string,
  rounds: number,
  oka: number
};

export type PlayerName = string;

export type PlayerId = number;

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

export type Score = {
  raw: number,
  uma: number,
  penalty: number
};

export type Seat = {
  playerId: PlayerId,
  score: Score
};

export type Participants = [Seat, Seat, Seat, Seat];

export type Game = {
  round: number,
  table: number,
  finished: boolean,
  participants: Participants
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