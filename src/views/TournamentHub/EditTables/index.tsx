import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Dropdown, { DropdownItem } from "../../../components/Dropdown";
import NumberInput from "../../../components/NumberInput";
import TextInput from "../../../components/TextInput";
import { PointSticks, Table } from "../../../data-types/tournament-data-types";
import { State, tournamentActionCreators } from "../../../state";
import { formatPoints } from "../../../utils/formatPoints";
import Ribbon from "../Ribbon";

const EditTables = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  const {addTables} = bindActionCreators(tournamentActionCreators, dispatch)

  const [newTables, setNewTables] = useState<Table[]>([...tournamentState.tables])
  const [openTable, setOpenTable] = useState<number>(0);

  const updateTable = (newTable: Table) => {
    const updatedTables = [...newTables];
    updatedTables[openTable] = newTable;
    setNewTables(updatedTables);
  };

  const updatePointSticks = (newSticks: PointSticks) => {
    const updatedTables = [...newTables];
    updatedTables[openTable].pointSticks = newSticks;
    setNewTables(updatedTables);
  };

  const saveTables = (): void => {
    addTables(newTables);
  };

  const isTableModified = (tableId: number) => {
    return tournamentState.tables[tableId].setOwner !== newTables[tableId].setOwner ||
           tournamentState.tables[tableId].matOwner !== newTables[tableId].matOwner ||
           tournamentState.tables[tableId].notes !== newTables[tableId].notes ||
           tournamentState.tables[tableId].pointSticks.tenThousand !== newTables[tableId].pointSticks.tenThousand ||
           tournamentState.tables[tableId].pointSticks.fiveThousand !== newTables[tableId].pointSticks.fiveThousand ||
           tournamentState.tables[tableId].pointSticks.oneThousand !== newTables[tableId].pointSticks.oneThousand ||
           tournamentState.tables[tableId].pointSticks.fiveHundred !== newTables[tableId].pointSticks.fiveHundred ||
           tournamentState.tables[tableId].pointSticks.oneHundred !== newTables[tableId].pointSticks.oneHundred;
  };

  const totalPoints = (({tenThousand, fiveThousand, oneThousand, fiveHundred, oneHundred}) => {
    return tenThousand*10000 + fiveThousand*5000 + oneThousand*1000 + fiveHundred*500 + oneHundred*100;
  })(newTables[openTable].pointSticks);

  const tableOptions: DropdownItem[] = newTables.map((_: Table, tableId: number) => ({
    value: tableId,
    text: `Table ${1 + tableId} ${isTableModified(tableId) ? "*" : ""}`
  }))

  return (
    <div>
      <Ribbon/>
      <h1>Edit tables</h1>
      <Dropdown
        label={"Table to edit"}
        items={tableOptions}
        value={openTable}
        onChange={(newValue): void => setOpenTable(newValue)}
      />
      <table>
        <tbody>
          <tr>
            <th>{null}</th>
            <th>Previous info</th>
            <th>New info</th>
            <th>{null}</th>
          </tr>
          <tr>
            <th>Set owner</th>
            <td>
              {tournamentState.tables[openTable].setOwner}
            </td>
            <td>
              <TextInput
                label={""}
                value={newTables[openTable].setOwner}
                onChange={(newValue: string): void => updateTable({...newTables[openTable], setOwner: newValue})}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].setOwner !== newTables[openTable].setOwner &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>Mat owner</th>
            <td>
              {tournamentState.tables[openTable].matOwner}
            </td>
            <td>
              <TextInput
                label={""}
                value={newTables[openTable].matOwner}
                onChange={(newValue: string): void => updateTable({...newTables[openTable], matOwner: newValue})}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].matOwner !== newTables[openTable].matOwner &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>Notes</th>
            <td>
              {tournamentState.tables[openTable].notes}
            </td>
            <td>
              <TextInput
                label={""}
                value={newTables[openTable].notes}
                onChange={(newValue: string): void => updateTable({...newTables[openTable], notes: newValue})}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].notes !== newTables[openTable].notes &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>10k sticks</th>
            <td>
              {tournamentState.tables[openTable].pointSticks.tenThousand}
            </td>
            <td>
              <NumberInput
                label={""}
                value={newTables[openTable].pointSticks.tenThousand}
                onChange={(newValue: number): void => updatePointSticks({...newTables[openTable].pointSticks, tenThousand: newValue})}
                steps={[1]}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].pointSticks.tenThousand !== newTables[openTable].pointSticks.tenThousand &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>5k sticks</th>
            <td>
              {tournamentState.tables[openTable].pointSticks.fiveThousand}
            </td>
            <td>
              <NumberInput
                label={""}
                value={newTables[openTable].pointSticks.fiveThousand}
                onChange={(newValue: number): void => updatePointSticks({...newTables[openTable].pointSticks, fiveThousand: newValue})}
                steps={[1]}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].pointSticks.fiveThousand !== newTables[openTable].pointSticks.fiveThousand &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>1k sticks</th>
            <td>
              {tournamentState.tables[openTable].pointSticks.oneThousand}
            </td>
            <td>
              <NumberInput
                label={""}
                value={newTables[openTable].pointSticks.oneThousand}
                onChange={(newValue: number): void => updatePointSticks({...newTables[openTable].pointSticks, oneThousand: newValue})}
                steps={[1]}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].pointSticks.oneThousand !== newTables[openTable].pointSticks.oneThousand &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>500 sticks</th>
            <td>
              {tournamentState.tables[openTable].pointSticks.fiveHundred}
            </td>
            <td>
              <NumberInput
                label={""}
                value={newTables[openTable].pointSticks.fiveHundred}
                onChange={(newValue: number): void => updatePointSticks({...newTables[openTable].pointSticks, fiveHundred: newValue})}
                steps={[1]}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].pointSticks.fiveHundred !== newTables[openTable].pointSticks.fiveHundred &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>100 sticks</th>
            <td>
              {tournamentState.tables[openTable].pointSticks.oneHundred}
            </td>
            <td>
              <NumberInput
                label={""}
                value={newTables[openTable].pointSticks.oneHundred}
                onChange={(newValue: number): void => updatePointSticks({...newTables[openTable].pointSticks, oneHundred: newValue})}
                steps={[1]}
              />
            </td>
            <td>
              {
                tournamentState.tables[openTable].pointSticks.oneHundred !== newTables[openTable].pointSticks.oneHundred &&
                "*"
              }
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{null}</td>
            <td>{formatPoints({points: totalPoints, sign: false})}</td>
          </tr>
        </tbody>
      </table>
      <button
        disabled={totalPoints !== 30000}
        onClick={() => saveTables()}>Save new tables</button>
    </div>
  )
};

export default EditTables;