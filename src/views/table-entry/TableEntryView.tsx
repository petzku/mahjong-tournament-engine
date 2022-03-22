import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Views } from "../../data-types/app-data-types";
import { tournamentActionCreators, State, appActionCreators } from "../../state";

import { Game, PointSticks, Table } from "../../data-types/tournament-data-types";
import TextInput from "../../components/TextInput";
import NumberInput from "../../components/NumberInput";

import { generateArray } from "../../utils/generateArray";

const PlayerEntryView = () => {
  const defaultPointSticks: PointSticks = {
    tenThousand: 1,
    fiveThousand: 2,
    oneThousand: 9,
    fiveHundred: 1,
    oneHundred: 5
  };

  const defaultTable: Table = {
    setOwner: "",
    matOwner: "",
    notes: "",
    pointSticks: defaultPointSticks
  };

  const [currentPointSticks, setCurrentPointSticks] = useState<PointSticks>(defaultPointSticks);
  const [currentTable, setCurrentTable] = useState<Table>(defaultTable);
  const [tables, setTables] = useState<Table[]>([]);
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  useEffect(() => {
    setCurrentTable({
      ...currentTable,
      pointSticks: currentPointSticks
    })
  }, [currentPointSticks]);

  const {addTables, addGames} = bindActionCreators(tournamentActionCreators, dispatch);
  const {changeView} = bindActionCreators(appActionCreators, dispatch);

  const totalPoints = (({tenThousand, fiveThousand, oneThousand, fiveHundred, oneHundred}) => {
    return tenThousand*10 + fiveThousand*5 + oneThousand + fiveHundred*0.5 + oneHundred*0.1;
  })(currentTable.pointSticks);

  const correctPointSticks = totalPoints === 30 - tournamentState.info.oka;

  const enoughTables = tables.length === tournamentState.playerNames.length / 4;

  const storeTable = (): void => {
    setTables([...tables, currentTable]);
    setCurrentPointSticks(defaultPointSticks);
    setCurrentTable(defaultTable);
  };

  const createGamesData = (): Game[] => {
    //Generate seating plan. Bad algorithm. TODO: Make a better one.
    const rounds = generateArray(tournamentState.info.rounds);
    const tables = generateArray(tournamentState.playerNames.length/4);

    const easts: number[][] = rounds.map((round: number): number[] => 
      tables.map((table: number): number => (4*table+round)%tournamentState.playerNames.length)
    );

    const souths: number[][] = rounds.map((round: number): number[] => 
      tables.map((table: number): number => (4*table+round+1)%tournamentState.playerNames.length)
    );

    const wests: number[][] = rounds.map((round: number): number[] => 
      tables.map((table: number): number => (4*table+round+2)%tournamentState.playerNames.length)
    );

    const norths: number[][] = rounds.map((round: number): number[] => 
      tables.map((table: number): number => (4*table+round+3)%tournamentState.playerNames.length)
    );

    return rounds.map((round: number): Game[] => 
      tables.map((table: number): Game => ({
        round: round,
        table: table,
        finished: false,
        score: {
          east: {
            playerId: easts[round][table],
            points: 0
          },
          south: {
            playerId: souths[round][table],
            points: 0
          },
          west: {
            playerId: wests[round][table],
            points: 0
          },
          north: {
            playerId: norths[round][table],
            points: 0
          }
        }
      }))
    ).reduce((combined: Game[], round: Game[]): Game[] => [...combined, ...round], []);
  };

  const saveAndContinue = (): void => {
    addTables(tables);
    addGames(createGamesData());
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
        onClick={() => storeTable()}>
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