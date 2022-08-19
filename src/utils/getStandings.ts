import { Game, PlayerId, PlayerName, Seat, Standing, Tournament } from "../data-types/tournament-data-types";

export const getStandings = (tournamentState: Tournament): Standing[] => {
  return tournamentState.playerNames.map((playerName: PlayerName, playerId: PlayerId): Standing => ({
    playerId: playerId,
    points: tournamentState.games.reduce((subTotal: number, game: Game) => {
      const playerSeat = game.participants.find((seat: Seat): boolean => seat.playerId === playerId);

      if (game.finished && playerSeat)
      {
        return subTotal + playerSeat.score.raw + playerSeat.score.uma + playerSeat.score.penalty;
      }
      return subTotal;
    }, 0)
  })).sort((a: Standing, b: Standing): number => (a.points < b.points) ? 1 : -1);
};