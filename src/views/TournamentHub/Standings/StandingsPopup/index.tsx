import { useSearchParams } from "react-router-dom";
import StandingsTable from "../../../../components/StandingsTable";
import { Tournament } from "../../../../data-types/tournament-data-types";
import styles from "./StandingsPopup.module.css";

const StandingsPopup = () => {
  const [searchParams] = useSearchParams();
  const afterRound = parseInt(searchParams.get("afterRound") as string);
  const message = searchParams.get("message") as string;
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  return (
    <div>
      <header className={styles.header}>Standings after round {afterRound + 1}</header>
      <div className={styles.standingsPopup}>
        <StandingsTable
          className={styles.splitStandings}
          split={true}
          tournament={tournament}
          afterRound={afterRound}
        />
      </div>
      <footer className={styles.note}>{message}</footer>
    </div>
  );
};

export default StandingsPopup;