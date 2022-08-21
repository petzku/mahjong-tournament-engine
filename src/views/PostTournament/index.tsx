import { Routes } from "../../utils/findRoute";
import { useNavigate } from "react-router-dom";

const PostTournament = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>The tournament is finished. Click the button below to open a new video that will display the standings in a cool way, so you can display the final results on a big screen.</p>

      <p>Instructions:</p>
      <ul>
        <li>The window will open blank.</li>
        <li>When you press "space" for the first time, the window will display results for everyone expect the top 5.</li>
        <li>After that, pressing "space" will reveal the top 5 players one by one.</li>
      </ul>

      <div>
        <button>Open final results window.</button>
      </div>
      <div>
        <button onClick={() => navigate(Routes.Schedule)}>Return to tournament.</button>
      </div>
    </div>
  );
}

export default PostTournament;