import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../components/Popup";
import TextInput from "../../../components/TextInput";
import { PlayerId, PlayerName } from "../../../data-types/tournament-data-types";
import { State } from "../../../state";
import HubTabs from "../HubTabs";
import { tournamentActionCreators } from "../../../state";
import { bindActionCreators } from "redux";

const EditPlayers = () => {
  const dispatch = useDispatch();
  const tournamentState = useSelector((state: State) => state.tournament);

  const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)

  const [newNames, setNewNames] = useState<PlayerName[]>([...tournamentState.playerNames])
  const [duplicates, setDuplicates] = useState<PlayerName[]>([]);

  const changeName = (newName: PlayerName, id: number): void => {
    const newNewNames = [...newNames];
    newNewNames[id] = newName;
    setNewNames(newNewNames);
  };

  const saveNames = (): void => {
    const duplicatesFromInput = newNames.filter((name: PlayerName, index: number) => newNames.indexOf(name) !== index);

    if (duplicatesFromInput.length > 0)
    {
      setDuplicates(duplicatesFromInput);
      return;
    }

    addPlayers(newNames);
  };

  return (
    <div>
      <HubTabs/>
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
              duplicates.map((name: PlayerName) => <li key={`duplicate-${name}`}>{name}</li>)
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
          </tr>
          {
            tournamentState.playerNames.map((name: PlayerName, id: PlayerId) => (
              <tr key={`editname-${id}`}>
                <td>
                  {name}
                </td>
                <td>
                  <TextInput
                    label={""}
                    value={newNames[id]}
                    onChange={(newValue: string) => changeName(newValue, id)}
                  />
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