import {Game, PlayerName, Table, Tournament} from "../../data-types/tournament-data-types";
import Action from "../actions/tournament-actions";
import ActionTypes from "../action-types/tournament-action-types";
import yaml from "js-yaml";

export const initialState: Tournament = {
  info: {
    title: "",
    location: "",
    start: "",
    end: "",
    rounds: 8,
    oka: 0
  },
  playerNames: [],
  tables: [],
  games: []
};

const reducer = (state: Tournament = initialState, action: Action): Tournament => {
  switch (action.type)
  {
    case ActionTypes.EditTournamentInfo:
    {
      const newState: Tournament = {
        ...state,
        info: action.payload
      };
      localStorage.setItem("mahjong-tournament", yaml.dump(newState));
      return newState;
    }
    case ActionTypes.AddPlayers:
    {  
      const newState: Tournament = {
        ...state,
        playerNames: action.payload
      };
      localStorage.setItem("mahjong-tournament", yaml.dump(newState));
      return newState;
    }
    case ActionTypes.AddTables:
    {
      const newState: Tournament = {
        ...state,
        tables: action.payload
      };
      localStorage.setItem("mahjong-tournament", yaml.dump(newState));
      return newState;
    }
    case ActionTypes.AddGames:
    {
      const newState: Tournament = {
        ...state,
        games: action.payload
      };
      localStorage.setItem("mahjong-tournament", yaml.dump(newState));
      return newState;
    }
    default:
      localStorage.setItem("mahjong-tournament", yaml.dump(state));
      return state;
  }
};

export default reducer;