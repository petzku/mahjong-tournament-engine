import { Dispatch } from "redux";
import ActionTypes from "../action-types/app-action-types";
import { MarkTournamentLoaded } from "../actions/app-actions";

export const markTournamentLoaded = (newValue: boolean) => {
	return (dispatch: Dispatch<MarkTournamentLoaded>) => {
		dispatch({
			type: ActionTypes.MarkTournamentLoaded,
			payload: newValue
		});
	}
};