import {combineReducers} from "redux";
import tournamentReducer from "./tournamentReducer";
import appReducer from "./appReducer";

const reducers = combineReducers({
  app: appReducer,
  tournament: tournamentReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;