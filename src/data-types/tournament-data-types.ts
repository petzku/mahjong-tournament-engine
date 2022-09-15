export type GeneralInfo = {
  title: string,
  rounds: number
};

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
  playerId: number,
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
  playerNames: string[],
  seatingTemplate: number[][],
  tables: Table[],
  games: Game[]
};

export type Standing = {
  playerId: number,
  points: number
};

export const isTournamentDataValid = (data: Tournament): boolean => {
  return (
    //Check that general tournament info is intact
    "info" in data &&
    "title" in data.info && typeof data.info.title === "string" &&
    "rounds" in data.info && typeof data.info.rounds === "number" &&
    Object.keys(data.info).length === 2 &&

    //Check that player names are ok
    "playerNames" in data &&
    !data.playerNames.some((name: string): boolean => typeof name !== "string") &&

    //Check that table data is ok
    "tables" in data &&
    (data.tables.length > 0 ? data.tables.length === data.playerNames.length / 4 : true) &&
    !data.tables.some((table: Table): boolean => (
      !("setOwner" in table) || typeof table.setOwner !== "string" ||
      !("matOwner" in table) || typeof table.matOwner !== "string" ||
      !("notes" in table) || typeof table.notes !== "string" ||
      !("pointSticks" in table) ||
      Object.keys(table).length !== 4 ||
      !("tenThousand" in table.pointSticks) || typeof table.pointSticks.tenThousand !== "number" ||
      !("fiveThousand" in table.pointSticks) || typeof table.pointSticks.fiveThousand !== "number" ||
      !("oneThousand" in table.pointSticks) || typeof table.pointSticks.oneThousand !== "number" ||
      !("fiveHundred" in table.pointSticks) || typeof table.pointSticks.fiveHundred !== "number" ||
      !("oneHundred" in table.pointSticks) || typeof table.pointSticks.oneHundred !== "number" ||
      Object.keys(table.pointSticks).length !== 5
    )) &&

    //Check that game data is ok
    "games" in data &&
    data.games.length === data.info.rounds * data.tables.length

    /*TODO: check that
      -each round has every player exactly once
      - there are no player id's outside actual player id range
      - there are no games with duplicate player ids
      -each round is named exactly data.tables.length times
      -each table is named exactly data.info.rounds times
      -each participant in each game has a valid score object
    */
  );
};