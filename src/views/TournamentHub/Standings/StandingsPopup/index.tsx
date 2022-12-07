import { useSearchParams } from "react-router-dom";
import StandingsTable from "../../../../components/StandingsTable";
import { Tournament } from "../../../../data-types/tournament-data-types";
import styles from "./StandingsPopup.module.css";

const StandingsPopup = () => {
  const [searchParams] = useSearchParams();
  const afterRound = parseInt(searchParams.get("afterRound") as string);
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  return (
    <div className={styles.standingsPopup}>
      <StandingsTable
        tournament={tournament}
        afterRound={afterRound}
      />
    </div>
  );
};

export default StandingsPopup;