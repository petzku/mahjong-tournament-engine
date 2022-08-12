import { PlayerName } from "../../../../data-types/tournament-data-types";

type HanchanProps = {
  east: PlayerName,
  south: PlayerName,
  west: PlayerName,
  north: PlayerName,
  hilight: string
};

const Hanchan = (props: HanchanProps) => {
  const isHilighted = (name: PlayerName) => props.hilight.length > 0 && name.toLowerCase().indexOf(props.hilight.toLowerCase()) >= 0;

  const eastHilight = isHilighted(props.east) ? "hilight" : "";
  const southHilight = isHilighted(props.south) ? "hilight" : "";
  const westHilight = isHilighted(props.west) ? "hilight" : "";
  const northHilight = isHilighted(props.north) ? "hilight" : "";

  const eastClassName = `player ${eastHilight}`;
  const southClassName = `player ${southHilight}`;
  const westClassName = `player ${westHilight}`;
  const northClassName = `player ${northHilight}`;

  return (
    <div className={"hanchan"}>
      <table className={"players"}>
        <tbody>
          <tr>
            <td>East</td>
            <td className={eastClassName}>{props.east}</td>
          </tr>
          <tr>
            <td>South</td>
            <td className={southClassName}>{props.south}</td>
          </tr>
          <tr>
            <td>West</td>
            <td className={westClassName}>{props.west}</td>
          </tr>
          <tr>
            <td>North</td>
            <td className={northClassName}>{props.north}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Hanchan;