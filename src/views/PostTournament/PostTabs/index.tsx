import { Routes } from "../../../utils/findRoute";
import { Link } from "react-router-dom";

const PostTabs = () => {
  return (
    <div>
      <Link to={Routes.PostTournament}>Post tournament hub</Link>
      <Link to={Routes.ReportCards}>Player report cards</Link>
    </div>
  );
};

export default PostTabs;