import {Dispatch} from "redux";

import { GeneralInfo, Player, Table, Game } from "../../types/tournament-types";
import ActionTypes from "../action-types/tournament-action-types";
import {
  EditTournamentInfoAction,
  AddPlayersAction,
  EditPlayerAction,
  RemovePlayerAction,
  AddTableAction,
  EditTableAction,
  RemoveTableAction,
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

export const editPlayer = (index: number, player: Player) => {
  return (dispatch: Dispatch<EditPlayerAction>) => {
    dispatch({
      type: ActionTypes.EditPlayer,
      index: index,
      payload: player
    });
  };
};

export const removePlayer = (index: number) => {
  return (dispatch: Dispatch<RemovePlayerAction>) => {
    dispatch({
      type: ActionTypes.RemovePlayer,
      index: index
    });
  };
};

export const addTable = (table: Table) => {
  return (dispatch: Dispatch<AddTableAction>) => {
    dispatch({
      type: ActionTypes.AddTable,
      payload: table
    });
  };
};

export const editTable = (index: number, table: Table) => {
  return (dispatch: Dispatch<EditTableAction>) => {
    dispatch({
      type: ActionTypes.EditTable,
      index: index,
      payload: table
    });
  };
};

export const removeTable = (index: number) => {
  return (dispatch: Dispatch<RemoveTableAction>) => {
    dispatch({
      type: ActionTypes.RemoveTable,
      index: index
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