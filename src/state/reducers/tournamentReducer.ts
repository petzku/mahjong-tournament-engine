import {Player, Table, Tournament} from "../../data-types/tournament-data-types";
import Action from "../actions/tournament-actions";
import ActionTypes from "../action-types/tournament-action-types";

const initialState: Tournament = {
  info: {
    title: "",
    location: "",
    start: "",
    end: "",
    oka: 0,
    uma: [15, 5]
  },
  players: [],
  tables: [],
  games: []
};

const reducer = (state: Tournament = initialState, action: Action) => {
  switch (action.type)
  {
    case ActionTypes.EditTournamentInfo:
      return {
        ...state,
        tournamentInfo: action.payload
      };
    case ActionTypes.AddPlayers:
      return {
        ...state,
        players: [...state.players, action.payload]
      };
    case ActionTypes.EditPlayer:
      return {
        ...state,
        players: state.players.map((player: Player, index: number): Player => index === action.index ? action.payload : player)
      };
    case ActionTypes.RemovePlayer:
      return {
        ...state,
        players: state.players.splice(action.index, 1)
      };
    case ActionTypes.AddTables:
      return {
        ...state,
        tables: action.payload
      };
    case ActionTypes.EditTable:
      return {
        ...state,
        tables: state.tables.map((table: Table, index: number): Table => index === action.index ? action.payload : table)
      };
    case ActionTypes.RemoveTable:
      return {
        ...state,
        tables: state.tables.splice(action.index, 1)
      };
    case ActionTypes.EditGame:
      return {
        ...state,
        games: [...state.games, action.payload]
      };
    default:
      return state;
  }
};

export default reducer;