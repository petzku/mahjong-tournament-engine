import { PlayerName } from "../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../utils/formatPoints";

import styles from "./Name.module.css";

type NameProps = {
  position: number,
  name: PlayerName,
  points: number,
  revealed: boolean
};

const Name = (props: NameProps) => {
  const trClassName = `${styles.standing} ${props.revealed ? styles.visible : styles.hidden}`;

  const position = ((): string => {
    switch (props.position)
    {
      case 3:
        return "🥉";
      case 2:
        return "🥈";
      case 1: 
        return "🥇";
      default:
        return `${props.position}.`;
    }
  })();

  return (
    <tr className={trClassName} style={{left: props.revealed ? "0" : "5em"}}>
      <td>
        {position}
      </td>
      <td>
        {props.name}
      </td>
      <td className={styles.points}>
        {props.points > 0 && "+"}{formatPoints(props.points)}
      </td>
    </tr>
  );
};

export default Name;