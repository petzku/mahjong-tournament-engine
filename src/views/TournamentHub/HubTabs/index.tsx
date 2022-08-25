import { Routes } from "../../../utils/findRoute";
import { Link } from "react-router-dom";

const HubTabs = () => {
  return (
    <div>
      <Link to={Routes.Schedule}>Full schedule</Link>
      <Link to={Routes.Standings}>Standings</Link>
      <Link to={Routes.PlayerSchedules}>Player schedules</Link>
      <Link to={Routes.TableSchedules}>Table schedules</Link>
    </div>
  );
};

export default HubTabs;