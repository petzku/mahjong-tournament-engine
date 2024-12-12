import { useState } from "react";
import { GeneralInfo } from "../../../data-types/tournament-data-types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { tournamentActionCreators } from "../../../state";
import TextInput from "../../../components/TextInput";
import NumberInput from "../../../components/NumberInput";
import { initialState } from "../../../state/reducers/tournamentReducer";
import { Routes } from "../../../utils/routeUtils";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import styles from "./TournamentInfoEntry.module.css";

const TournamentInfoView = () => {
	const navigate = useNavigate();
	const [currentInfo, setCurrentInfo] = useState<GeneralInfo>(initialState.info);
	const dispatch = useDispatch();

	const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch);

	const onSave = (): void => {
		editTournamentInfo(currentInfo);
		navigate(Routes.PlayerEntry);
	};

	return (
		<div className={styles.tournamentInfoEntry}>
			<p>Start new tournament</p>
			<TextInput
				label={"Tournament title"}
				value={currentInfo.title}
				onChange={(newValue: string): void => setCurrentInfo({...currentInfo, title: newValue})}
			/>
			<NumberInput
				label={"Rounds"}
				value={currentInfo.rounds}
				buttons={true}
				onChange={(newValue: number): void => setCurrentInfo({...currentInfo, rounds: newValue})}
			/>
			<NumberInput
				label={"Starting points"}
				value={currentInfo.startingPoints}
				buttons={false}
				onChange={(newValue: number): void => setCurrentInfo({...currentInfo, startingPoints: newValue})}
			/>
			<Button
				label={"Ready"}
				onClick={() => onSave()}
			/>
		</div>
	);
};

export default TournamentInfoView;