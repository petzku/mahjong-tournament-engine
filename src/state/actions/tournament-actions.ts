import ActionTypes from "../action-types/tournament-action-types";
import {GeneralInfo} from "../../types/tournament-types";
import {Player} from "../../types/tournament-types";
import {Table} from "../../types/tournament-types";
import {Game} from "../../types/tournament-types";

export type EditTournamentInfoAction = {
  type: ActionTypes.EditTournamentInfo,
  payload: GeneralInfo
};

export type AddPlayersAction = {
  type: ActionTypes.AddPlayers,
  payload: Player[]
};

export type EditPlayerAction = {
  type: ActionTypes.EditPlayer,
  index: number,
  payload: Player
};

export type RemovePlayerAction = {
  type: ActionTypes.RemovePlayer,
  index: number
};

export type AddTableAction = {
  type: ActionTypes.AddTable,
  payload: Table
};

export type EditTableAction = {
  type: ActionTypes.EditTable,
  index: number,
  payload: Table
};

export type RemoveTableAction = {
  type: ActionTypes.RemoveTable,
  index: number
};

export type EditGameAction = {
  type: ActionTypes.EditGame,
  index: number,
  payload: Game
};

type Action =
 EditTournamentInfoAction |
 AddPlayersAction | 
 EditPlayerAction | 
 RemovePlayerAction | 
 AddTableAction | 
 EditTableAction | 
 RemoveTableAction | 
 EditGameAction;

export default Action;