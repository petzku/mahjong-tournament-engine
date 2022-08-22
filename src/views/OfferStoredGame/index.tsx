import Popup from "../../components/Popup";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators, appActionCreators } from "../../state";
import { findRoute, Routes } from "../../utils/findRoute";
import { isTournamentDataValid, Tournament } from "../../data-types/tournament-data-types";
import { Navigate, useNavigate } from "react-router-dom";

const OfferStoredGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { markTournamentLoaded } = bindActionCreators(appActionCreators, dispatch);
  const { setTournament } = bindActionCreators(tournamentActionCreators, dispatch);

  const offerStoredGame = (() => {
    if (localStorage.getItem("mahjong-tournament") !== null)
    {
      const readFromLocalStorage: string = localStorage.getItem("mahjong-tournament") as string;

      try
      {
        const possibleTournamentState: Tournament = JSON.parse(readFromLocalStorage);

        return isTournamentDataValid(possibleTournamentState);
      }
      catch (e)
      {
        console.log("error", e);
        return false;
      }
    }

    return false;
  })();

  const cancel = () => {
    localStorage.removeItem("mahjong-tournament");
    markTournamentLoaded(true);
    navigate(Routes.TournamentInfoEntry);
  };

  const load = () => {
    const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
    const view = findRoute(tournament);
    markTournamentLoaded(true);
    setTournament(tournament);
    navigate(view);
  };

  if (!offerStoredGame)
  {
    return <Navigate to={Routes.TournamentInfoEntry}/>
  }

  return (
    <Popup
      title={"Reopen tournament from memory?"}
      cancelText={"No, start new tournament"}
      confirmText={"Yes, load tournament"}
      onCancel={(): void => cancel()}
      onConfirm={(): void => load()}>
      <p>There appears to be a tournament saved in your browser memory.</p>

      <p>Would you like to restore that tournament or start a new one?</p>

      <p><strong>If you start a new tournament, the stored tournament will be cleared and cannot be restored.</strong></p>
    </Popup>
  );
};

export default OfferStoredGame;