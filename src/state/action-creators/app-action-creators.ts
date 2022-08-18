import { Dispatch } from "redux";

import ActionTypes from "../action-types/app-action-types";
import { View } from "../../data-types/app-data-types";
import { ChangeView, MarkTournamentLoaded } from "../actions/app-actions";

export const changeView = (newView: View) => {
  return (dispatch: Dispatch<ChangeView>) => {
    dispatch({
      type: ActionTypes.ChangeView,
      payload: newView
    });
  }
};

export const markTournamentLoaded = (newValue: boolean) => {
  return (dispatch: Dispatch<MarkTournamentLoaded>) => {
    dispatch({
      type: ActionTypes.MarkTournamentLoaded,
      payload: newValue
    });
  }
};