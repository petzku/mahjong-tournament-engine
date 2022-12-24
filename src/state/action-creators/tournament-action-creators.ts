import {Dispatch} from "redux";
import { GeneralInfo, Game, Tournament } from "../../data-types/tournament-data-types";
import ActionTypes from "../action-types/tournament-action-types";
import {
	EditTournamentInfoAction,
	AddPlayersAction,
	AddSeatingTemplateAction,
	AddGamesAction,
	SetTournament
} from "../actions/tournament-actions";

export const editTournamentInfo = (newInfo: GeneralInfo) => {
	return (dispatch: Dispatch<EditTournamentInfoAction>) => {
		dispatch({
			type: ActionTypes.EditTournamentInfo,
			payload: newInfo
		});
	};
};

export const addPlayers = (players: string[]) => {
	return (dispatch: Dispatch<AddPlayersAction>) => {
		dispatch({
			type: ActionTypes.AddPlayers,
			payload: players
		});
	};
};

export const addSeatingTemplate = (template: number[][]) => {
	return (dispatch: Dispatch<AddSeatingTemplateAction>) => {
		dispatch({
			type: ActionTypes.AddSeatingTemplate,
			payload: template
		});
	};
};

export const addGames = (games: Game[]) => {
	return (dispatch: Dispatch<AddGamesAction>) => {
		dispatch({
			type: ActionTypes.AddGames,
			payload: games
		});
	};
};

export const setTournament = (tournament: Tournament) => {
	return (dispatch: Dispatch<SetTournament>) => {
		dispatch({
			type: ActionTypes.SetTournament,
			payload: tournament
		});
	};
};