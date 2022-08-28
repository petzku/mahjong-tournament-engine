import { Routes } from "../../../utils/routeUtils";
import { Link } from "react-router-dom";

const HubTabs = () => {
  return (
    <div>
      <Link to={Routes.Schedule}>Full schedule</Link>
      <Link to={Routes.Standings}>Standings</Link>
      <Link to={Routes.EditPlayers}>Edit players</Link>
      <Link to={Routes.EditTables}>Edit tables</Link>
      <Link to={Routes.PrintOuts}>Print-outs</Link>
    </div>
  );
};

export default HubTabs;