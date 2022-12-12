import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../components/Popup";
import TextInput from "../../../components/TextInput";
import { State } from "../../../state";
import Ribbon from "../Ribbon";
import { tournamentActionCreators } from "../../../state";
import { bindActionCreators } from "redux";

const EditPlayers = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)

  const [newNames, setNewNames] = useState<string[]>([...tournamentState.playerNames])
  const [duplicates, setDuplicates] = useState<string[]>([]);

  const changeName = (params: {newName: string, playerId: number}): void => {
    const newNewNames = [...newNames];
    newNewNames[params.playerId] = params.newName;
    setNewNames(newNewNames);
  };

  const saveNames = (): void => {
    const duplicatesFromInput = newNames.filter((name: string, index: number) => newNames.indexOf(name) !== index);

    if (duplicatesFromInput.length > 0)
    {
      setDuplicates(duplicatesFromInput);
      return;
    }

    addPlayers(newNames);
  };

  return (
    <div>
      {
        duplicates.length > 0 &&
        <Popup
          title={"Duplicate players"}
          cancelHidden={true}
          cancelText={""}
          onCancel={() => {}}
          confirmText={"Ok"}
          onConfirm={(): void => setDuplicates([])}>
          <p>Please add some uniqueness (e.g. middle initial, nickname or city) to the names of these players:</p>
          <ul>
            {
              duplicates.map((name: string) => <li key={`duplicate-${name}`}>{name}</li>)
            }
          </ul>
        </Popup>
      }
      <h1>Edit player names</h1>
      <table>
        <tbody>
          <tr>
            <th>Previous name</th>
            <th>New name</th>
            <th>{null}</th>
          </tr>
          {
            tournamentState.playerNames.map((name: string, playerId: number) => (
              <tr key={`editname-${playerId}`}>
                <td>
                  {name}
                </td>
                <td>
                  <TextInput
                    label={""}
                    value={newNames[playerId]}
                    onChange={(newValue: string) => changeName({newName: newValue, playerId: playerId})}
                  />
                </td>
                <td>
                  {
                    name !== newNames[playerId] &&
                    "*"
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <button onClick={(): void => saveNames()}>Save new names</button>
    </div>
  )
};

export default EditPlayers;