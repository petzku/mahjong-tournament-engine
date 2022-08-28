import { Table } from "../../../../data-types/tournament-data-types";

const TableInfo = (props: Table) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Set owner</th>
          <td>{props.setOwner}</td>
        </tr>
        <tr>
          <th>Mat owner</th>
          <td>{props.matOwner}</td>
        </tr>
        <tr>
          <th>Notes</th>
          <td>{props.notes}</td>
        </tr>
        <tr>
          <th>Point sticks</th>
          <td>
            <ul>
              <li>{props.pointSticks.tenThousand} x 10k</li>
              <li>{props.pointSticks.fiveThousand} x 5k</li>
              <li>{props.pointSticks.oneThousand} x 1k</li>
              <li>{props.pointSticks.fiveHundred} x 500</li>
              <li>{props.pointSticks.oneHundred} x 100</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableInfo;