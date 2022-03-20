import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../data-types/app-data-types";
import { tournamentActionCreators, State, appActionCreators } from "./../../state";

import { PointSticks, Table } from "../../data-types/tournament-data-types";
import TextInput from "../../components/TextInput";
import NumberInput from "../../components/NumberInput";

const PlayerEntryView = () => {
  const [currentPointSticks, setCurrentPointSticks] = useState<PointSticks>({
    tenThousand: 1,
    fiveThousand: 2,
    oneThousand: 9,
    fiveHundred: 1,
    oneHundred: 5
  });
  const [currentTable, setCurrentTable] = useState<Table>({
    setOwner: "",
    matOwner: "",
    notes: "",
    pointSticks: currentPointSticks
  });
  const [tables, setTables] = useState<Table[]>([]);
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  useEffect(() => {
    setCurrentTable({
      ...currentTable,
      pointSticks: currentPointSticks
    })
  }, [currentPointSticks]);

  const {addTables} = bindActionCreators(tournamentActionCreators, dispatch);
  const {changeView} = bindActionCreators(appActionCreators, dispatch);

  const totalPoints = (({tenThousand, fiveThousand, oneThousand, fiveHundred, oneHundred}) => {
    return tenThousand*10 + fiveThousand*5 + oneThousand + fiveHundred*0.5 + oneHundred*0.1;
  })(currentTable.pointSticks);

  const correctPointSticks = totalPoints === 30 - tournamentState.info.oka;

  const enoughTables = tables.length === tournamentState.playerNames.length / 4;

  const saveAndContinue = (): void => {
    addTables(tables);
    changeView(Views.InTournament);
  };

  return (
    <div>
      <p>Enter information for table {tables.length + 1}.</p>
      <TextInput
        label={"Set owner"}
        value={currentTable.setOwner}
        onChange={(newValue: string): void => setCurrentTable({...currentTable, setOwner: newValue})}
      />
      <TextInput
        label={"Mat owner"}
        value={currentTable.matOwner}
        onChange={(newValue: string): void => setCurrentTable({...currentTable, matOwner: newValue})}
      />
      <TextInput
        label={"Notes"}
        value={currentTable.notes}
        onChange={(newValue: string): void => setCurrentTable({...currentTable, notes: newValue})}
      />
      <NumberInput
        label={"10k sticks"}
        value={currentTable.pointSticks.tenThousand}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, tenThousand: newValue})}
      />
      <NumberInput
        label={"5k sticks"}
        value={currentTable.pointSticks.fiveThousand}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, fiveThousand: newValue})}
      />
      <NumberInput
        label={"1k sticks"}
        value={currentTable.pointSticks.oneThousand}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, oneThousand: newValue})}
      />
      <NumberInput
        label={"500 sticks"}
        value={currentTable.pointSticks.fiveHundred}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, fiveHundred: newValue})}
      />
      <NumberInput
        label={"100 sticks"}
        value={currentTable.pointSticks.oneHundred}
        onChange={(newValue: number): void => setCurrentPointSticks({...currentPointSticks, oneHundred: newValue})}
      />
      <p>Total points {totalPoints}.</p>
      <button
        disabled={!correctPointSticks || enoughTables}
        onClick={() => setTables([...tables, currentTable])}>
        Store table
      </button>
      <button
        disabled={!enoughTables}
        onClick={() => saveAndContinue()}>
        Save tables and continue
      </button>
      {
        tables.map((table, index) => {
          return (
            <table key={`table-${index}`}>
              <thead>
                <tr>
                  <th colSpan={2}>Table {index + 1}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Set owner</td>
                  <td>{table.setOwner}</td>
                </tr>
                <tr>
                  <td>Mat owner</td>
                  <td>{table.matOwner}</td>
                </tr>
                <tr>
                  <td>Notes</td>
                  <td>{table.notes}</td>
                </tr>
                <tr>
                  <td>Point sticks</td>
                  <td>{table.pointSticks.tenThousand} - {table.pointSticks.fiveThousand} - {table.pointSticks.oneThousand} - {table.pointSticks.fiveHundred} - {table.pointSticks.oneHundred}</td>
                </tr>
              </tbody>
            </table>
          );
        })
      }
    </div>
  );
};

export default PlayerEntryView;