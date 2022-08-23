import { PlayerName } from "../../../../data-types/tournament-data-types";
import { formatPoints } from "../../../../utils/formatPoints";

import styles from "./Name.module.css";

type NameProps = {
  position: number,
  name: PlayerName,
  points: number,
  hidden: boolean
};

const Name = (props: NameProps) => {
  const trClassName = `${styles.standing} ${props.hidden ? styles.hidden : styles.visible}`;

  return (
    <tr className={trClassName} style={{left: props.hidden ? "5em" : "0"}}>
      <td>
        {props.position}.
      </td>
      <td>
        {props.name}
      </td>
      <td>
        {formatPoints(props.points)}
      </td>
    </tr>
  );
};

export default Name;