import { useSelector } from "react-redux";
import { Tournament } from "../../data-types/tournament-data-types";
import { State } from "../../state";
import useAppState from "./useAppState";
import { isTournamentDataValid } from "../../data-types/tournament-data-types";
import { initialState } from "../../state/reducers/tournamentReducer";

const useTournament = (): Tournament => {
	const appState = useAppState();
	const tournamentFromState = useSelector((state: State) => state.tournament);
	if (appState.tournamentLoaded) return tournamentFromState;

	const tournamentFromLocalStorage = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
	if (isTournamentDataValid(tournamentFromLocalStorage)) return tournamentFromLocalStorage;

	return initialState;
};

export default useTournament;