import { Views, App } from "../../data-types/app-data-types";
import Action from "../actions/app-actions";
import ActionTypes from "../action-types/app-action-types";

const initialState: App = {
  view: Views.TournamentInfoEntry,
  tournamentLoaded: false
};

const reducer = (state: App = initialState, action: Action): App => {
  switch (action.type)
  {
    case ActionTypes.ChangeView:
      return {
        ...state,
        view: action.payload
      };
    case ActionTypes.MarkTournamentLoaded:
      return {
        ...state,
        tournamentLoaded: action.payload
      };
    default:
      return state;
  }
};

export default reducer;