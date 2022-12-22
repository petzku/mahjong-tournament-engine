import { Tournament } from "../../data-types/tournament-data-types";
import Action from "../actions/tournament-actions";
import ActionTypes from "../action-types/tournament-action-types";

export const initialState: Tournament = {
  info: {
    title: "",
    rounds: 8
  },
  playerNames: [],
  seatingTemplate: [],
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
      localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
      return newState;
    }
    case ActionTypes.AddPlayers:
    {  
      const newState: Tournament = {
        ...state,
        playerNames: action.payload
      };
      localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
      return newState;
    }
    case ActionTypes.AddSeatingTemplate:
    {  
      const newState: Tournament = {
        ...state,
        seatingTemplate: action.payload
      };
      localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
      return newState;
    }
    case ActionTypes.AddGames:
    {
      const newState: Tournament = {
        ...state,
        games: action.payload
      };
      localStorage.setItem("mahjong-tournament", JSON.stringify(newState));
      return newState;
    }
    case ActionTypes.SetTournament:
      localStorage.setItem("mahjong-tournament", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default reducer;