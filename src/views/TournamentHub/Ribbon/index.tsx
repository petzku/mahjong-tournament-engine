import { Routes } from "../../../utils/routeUtils";
import { Link } from "react-router-dom";
import styles from "./Ribbon.module.css";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import download from "../../../utils/download";

const Ribbon = () => {
	const tournamentState = useSelector((state: State) => state.tournament);

	return (
		<div className={styles.ribbon}>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.Overview}>Overview</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.Standings}>Standings</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.EditPlayers}>Edit players</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.PrintOuts}>Print-outs</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.FinalResults}>Final results</Link>
			</div>
			<div className={styles.ribbonItem}>
				<Link className={styles.link} to={Routes.ReportCards}>Report cards</Link>
			</div>
			<div className={styles.ribbonItem}>
				<span className={styles.link} onClick={() => download(tournamentState)}>Download file</span>
			</div>
		</div>
	);
};

export default Ribbon;