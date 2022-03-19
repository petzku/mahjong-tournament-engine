import {Dispatch} from "redux";

import { GeneralInfo, Player, Table, Game } from "../../data-types/tournament-data-types";
import ActionTypes from "../action-types/tournament-action-types";
import {
  EditTournamentInfoAction,
  AddPlayersAction,
  AddTablesAction,
  EditGameAction
} from "../actions/tournament-actions";

export const editTournamentInfo = (newInfo: GeneralInfo) => {
  return (dispatch: Dispatch<EditTournamentInfoAction>) => {
    dispatch({
      type: ActionTypes.EditTournamentInfo,
      payload: newInfo
    });
  };
};

export const addPlayers = (players: Player[]) => {
  return (dispatch: Dispatch<AddPlayersAction>) => {
    dispatch({
      type: ActionTypes.AddPlayers,
      payload: players
    });
  };
};

export const addTables = (tables: Table[]) => {
  return (dispatch: Dispatch<AddTablesAction>) => {
    dispatch({
      type: ActionTypes.AddTables,
      payload: tables
    });
  };
};

export const editGame = (index: number, game: Game) => {
  return (dispatch: Dispatch<EditGameAction>) => {
    dispatch({
      type: ActionTypes.EditGame,
      index: index,
      payload: game
    });
  };
};