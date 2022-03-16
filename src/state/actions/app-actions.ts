import ActionTypes from "../action-types/app-action-types";
import { View } from "../../types/app-types";

export type ChangeView = {
  type: ActionTypes.ChangeView,
  payload: View
};

type Action = ChangeView;

export default Action;