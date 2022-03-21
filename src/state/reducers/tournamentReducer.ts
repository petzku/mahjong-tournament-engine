import {Game, PlayerName, Table, Tournament} from "../../data-types/tournament-data-types";
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
  playerNames: [],
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
        playerNames: action.payload
      };
    case ActionTypes.AddTables:
      return {
        ...state,
        tables: action.payload
      };
    case ActionTypes.AddGames:
      return {
        ...state,
        games: action.payload
      };
    default:
      return state;
  }
};

export default reducer;