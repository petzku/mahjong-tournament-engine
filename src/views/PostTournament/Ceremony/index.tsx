import { useEffect, useState } from "react";
import { Standing, Tournament } from "../../../data-types/tournament-data-types";
import { getStandings } from "../../../utils/getStandings";

import Confetti from "react-confetti";

import styles from "./Ceremony.module.css";
import Name from "./Name";

const Ceremony = () => {
  const tournament: Tournament = JSON.parse(localStorage.getItem("mahjong-tournament") as string);

  const [windowSize, setWindowSize] = useState<{width: number, height: number}>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [shouldRevealNext, setShouldRevealNext] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean[]>(Array(tournament.playerNames.length).fill(false));

  const revealNext = () => {
    const nextToReveal = revealed.lastIndexOf(false);
    const newList = [...revealed];
    newList[nextToReveal] = true;
    setRevealed(newList);
    if (nextToReveal <= 6 && shouldRevealNext)
    {
      setShouldRevealNext(false);
    }
  };

  useEffect(() => {
    if (shouldRevealNext)
    {
      if (revealed.filter((item: boolean): boolean => !item).length > 5)
      {
        setTimeout(revealNext, 50);
        return;
      }
      revealNext();
    }
  }, [shouldRevealNext, revealed]);

  useEffect(() => {
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.code === "Space")
      {
        setShouldRevealNext(true);
      }
    });
  }, []);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [window.innerWidth, window.innerHeight]);

  const topName = (id: number) => (
    <table>
      <tbody>
        <Name
          key={`standing-${id}`}
          position={id + 1}
          name={tournament.playerNames[standings[id].playerId]}
          points={standings[id].points}
          revealed={revealed[id]}
        />
      </tbody>
    </table>
  );

  const standings = getStandings({tournament: tournament, atRound: tournament.info.rounds});

  const topHalfCount = Math.round((standings.length - 5) / 2);

  return (
    <div className={styles.backdrop}>
      {
        !revealed.some((item: boolean): boolean => !item) &&
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          gravity={0.05}
        />
      }
      <div className={styles.topPlayers}>
        <div className={`${styles.columns} ${styles.gold}`}>
          {topName(0)}
        </div>
        <div className={`${styles.columns} ${styles.silverBronze}`}>
          <div className={styles.silver}>
            {topName(1)}
          </div>
          <div className={styles.bronze}>
            {topName(2)}
          </div>
        </div>
        <div className={`${styles.columns} ${styles.fourthFifth}`}>
          <div className={styles.fourth}>
            {topName(3)}
          </div>
          <div className={styles.fifth}>
            {topName(4)}
          </div>
        </div>
      </div>
      <div className={`${styles.columns} ${styles.bottomPlayers}`}>
        <div>
          <table>
            <tbody>
              {
                standings.filter((_: Standing, rank: number): boolean => rank >= 5 && rank < 5+topHalfCount).map((standing: Standing, rank: number) => (
                  <Name
                    key={`standing-${rank}`}
                    position={rank + 6}
                    name={tournament.playerNames[standing.playerId]}
                    points={standing.points}
                    revealed={revealed[rank + 5]}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
        <div>
        <table>
            <tbody>
              {
                standings.filter((_: Standing, rank: number): boolean => rank >= 5+topHalfCount).map((standing: Standing, rank: number) => (
                  <Name
                    key={`standing-${rank}`}
                    position={rank + 6 + Math.round((standings.length - 5)/2)}
                    name={tournament.playerNames[standing.playerId]}
                    points={standing.points}
                    revealed={revealed[rank + 5 + Math.round((standings.length - 5)/2)]}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ceremony;