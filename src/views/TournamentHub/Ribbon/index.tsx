import { Routes } from "../../../utils/routeUtils";
import { Link } from "react-router-dom";
import styles from "./Ribbon.module.css";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import download from "../../../utils/download";
import { Game } from "../../../data-types/tournament-data-types";

const Ribbon = () => {
  const tournamentState = useSelector((state: State) => state.tournament);
  
  const tournamentFinished = !tournamentState.games.some((game: Game): boolean => !game.finished);
  
  return (
    <div className={styles.ribbon}>
      <div className={styles.ribbonItem}>
        <Link className={`${styles.link} ${styles.enabled}`} to={Routes.Schedule}>Full schedule</Link>
      </div>
      <div className={styles.ribbonItem}>
        <Link className={`${styles.link} ${styles.enabled}`} to={Routes.Standings}>Standings</Link>
      </div>
      <div className={styles.ribbonItem}>
        <Link className={`${styles.link} ${styles.enabled}`} to={Routes.EditPlayers}>Edit players</Link>
      </div>
      <div className={styles.ribbonItem}>
        <Link className={`${styles.link} ${styles.enabled}`} to={Routes.EditTables}>Edit tables</Link>
      </div>
      <div className={styles.ribbonItem}>
        <Link className={`${styles.link} ${styles.enabled}`} to={Routes.PrintOuts}>Print-outs</Link>
      </div>
      <div className={styles.ribbonItem}>
        {
          tournamentFinished
          ?
          <Link className={`${styles.link} ${styles.enabled}`} to={Routes.FinalResults}>Final results</Link>
          :
          <span className={`${styles.link} ${styles.disabled}`}>Final results</span>
        }
      </div>
      <div className={styles.ribbonItem}>
        {
          tournamentFinished
          ?
          <Link className={`${styles.link} ${styles.enabled}`} to={Routes.ReportCards}>Report cards</Link>
          :
          <span className={`${styles.link} ${styles.disabled}`}>Report cards</span>
        }
      </div>
      <div className={styles.ribbonItem}>
        <span className={`${styles.link} ${styles.enabled}`} onClick={() => download(tournamentState)}>Download file</span>
      </div>
    </div>
  );
};

export default Ribbon;