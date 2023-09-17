import { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "../../../components/Popup";
import TextInput from "../../../components/TextInput";
import { tournamentActionCreators } from "../../../state";
import { bindActionCreators } from "redux";
import Button from "../../../components/Button";
import useTournament from "../../../utils/hooks/useTournament";

const EditPlayers = () => {
	const dispatch = useDispatch();
	const tournament = useTournament();

	const {addPlayers} = bindActionCreators(tournamentActionCreators, dispatch)

	const [newNames, setNewNames] = useState<string[]>([...tournament.playerNames])
	const [duplicates, setDuplicates] = useState<string[]>([]);

	const changeName = (params: {newName: string, playerId: number}): void => {
		setNewNames(newNames.map((oldName: string, index: number) => index === params.playerId ? params.newName : oldName))
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
						tournament.playerNames.map((name: string, playerId: number) => (
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
			<Button
				label={"Save new names"}
				onClick={() => saveNames()}
			/>
		</div>
	)
};

export default EditPlayers;