import { useEffect, useState } from "react";
import { Standing, Tournament } from "../../../data-types/tournament-data-types";
import { getStandings } from "../../../utils/getStandings";

import styles from "./Ceremony.module.css";
import Name from "./Name";

const Ceremony = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);
  
  const [revealingBottom, setRevealingBottom] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean[]>(Array(tournament.playerNames.length).fill(true));

  const revealNextAutomatic = () => {
    const nextToReveal = hidden.lastIndexOf(true);
    const newList = [...hidden];
    newList[nextToReveal] = false;
    setHidden(newList);
    if (nextToReveal === 6)
    {
      setRevealingBottom(false)
    }
  };

  useEffect(() => {
    if (revealingBottom)
    {
      const revealer = setTimeout(revealNextAutomatic, 50);
    }
  }, [revealingBottom, hidden]);

  const standings = getStandings(tournament);

  return (
    <div className={styles.backdrop}>
      <table>
        <tbody>
          {
            standings.filter((_: Standing, id: number): boolean => id >= 5).map((standing: Standing, id: number) => (
              <Name
                key={`standing-${id}`}
                position={id + 6}
                name={tournament.playerNames[standing.playerId]}
                points={standing.points}
                hidden={hidden[id + 5]}
              />
            ))
          }
        </tbody>
      </table>
      <button onClick={() => setRevealingBottom(true)}>Reveal all except top 5</button>
    </div>
  );
};

export default Ceremony;