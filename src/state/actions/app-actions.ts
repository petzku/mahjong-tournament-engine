import ActionTypes from "../action-types/app-action-types";
import { View } from "../../data-types/app-data-types";

export type ChangeView = {
  type: ActionTypes.ChangeView,
  payload: View
};

type Action = ChangeView;

export default Action;