import {Game, Player, Table, Tournament} from "../../data-types/tournament-data-types";
import Action from "../actions/tournament-actions";
import ActionTypes from "../action-types/tournament-action-types";

export const initialState: Tournament = {
  info: {
    title: "",
    location: "",
    start: "",
    end: "",
    rounds: 8,
    oka: 0,
    uma: [15, 5]
  },
  players: [],
  tables: [],
  games: []
};

const reducer = (state: Tournament = initialState, action: Action): Tournament => {
  switch (action.type)
  {
    case ActionTypes.EditTournamentInfo:
      return {
        ...state,
        info: action.payload
      };
    case ActionTypes.AddPlayers:
      return {
        ...state,
        players: action.payload
      };
    case ActionTypes.AddTables:
      return {
        ...state,
        tables: action.payload
      };
    case ActionTypes.EditGame:
      return {
        ...state,
        games: state.games.map((game: Game, index: number): Game => index === action.index ? action.payload : game)
      };
    default:
      return state;
  }
};

export default reducer;