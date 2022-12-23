import { useState } from "react";
import Button from "../../../components/Button";

const FinalResults = () => {
  const [finalResultsPopup, setFinalResultsPopup] = useState<WindowProxy | null>(null);

  const openWindow = () => {
    setFinalResultsPopup(window.open(
      "/hub/final-results/popup",
      "finalResultsPopup",
      "width=500,height=500"
    ));
  };

  return (
    <div>
      <h1>Post-tournament</h1>
      <p>The tournament is finished. Click the button below to open a new video that will display the standings in a cool way, so you can display the final results on a big screen.</p>

      <p>Instructions:</p>
      <ul>
        <li>The window will open blank.</li>
        <li>When you press "space" for the first time, the window will display results for everyone expect the top 5.</li>
        <li>After that, pressing "space" will reveal the top 5 players one by one.</li>
      </ul>

      <div>
				<Button
					label={"Open final results window."}
					onClick={() => openWindow()}
				/>
      </div>
    </div>
  );
}

export default FinalResults;