import styles from "./Toggle.module.css";

type ToggleProps = {
	true: string,
	false: string,
	value: boolean,
	onSwitch: () => void
};

const Toggle = (props: ToggleProps) => {
	const trueClassName = `${styles.option} ${props.value ? styles.selected : ""}`;
	const falseClassName = `${styles.option} ${!props.value ? styles.selected : ""}`;

	return (
		<div>
			<label
				className={trueClassName}
				onClick={() => props.onSwitch()}>
				{props.true}
			</label>
			<label
				className={falseClassName}
				onClick={() => props.onSwitch()}>
				{props.false}
			</label>
		</div>
	);
};

export default Toggle;