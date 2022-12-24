import ActionTypes from "../action-types/app-action-types";

export type MarkTournamentLoaded = {
	type: ActionTypes.MarkTournamentLoaded,
	payload: boolean
};

type Action = MarkTournamentLoaded;

export default Action;