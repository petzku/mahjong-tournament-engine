import {combineReducers} from "redux";
import tournamentReducer from "./tournamentReducer";
import appReducer from "./appReducer";

const reducers = combineReducers({
	tournament: tournamentReducer,
	app: appReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;