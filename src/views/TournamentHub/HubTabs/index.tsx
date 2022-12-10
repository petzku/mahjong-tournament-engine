import { Routes } from "../../../utils/routeUtils";
import { Link } from "react-router-dom";
import styles from "./HubTabs.module.css";

const HubTabs = () => {
  return (
    <div className={styles.hubTabs}>
      <Link className={styles.tab} to={Routes.Schedule}>Full schedule</Link>
      <Link className={styles.tab} to={Routes.Standings}>Standings</Link>
      <Link className={styles.tab} to={Routes.EditPlayers}>Edit players</Link>
      <Link className={styles.tab} to={Routes.EditTables}>Edit tables</Link>
      <Link className={styles.tab} to={Routes.PrintOuts}>Print-outs</Link>
    </div>
  );
};

export default HubTabs;