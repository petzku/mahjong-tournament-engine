import ActionTypes from "../action-types/app-action-types";
import { View } from "../../data-types/app-data-types";

export type ChangeView = {
  type: ActionTypes.ChangeView,
  payload: View
};

export type MarkTournamentLoaded = {
  type: ActionTypes.MarkTournamentLoaded,
  payload: boolean
};

type Action = ChangeView | MarkTournamentLoaded;

export default Action;