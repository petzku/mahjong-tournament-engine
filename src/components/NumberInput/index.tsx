import Button from "../Button";
import TextInput from "../TextInput";
import styles from "./NumberInput.module.css";

type NumberInputProps = {
	className?: string,
	label: string,
	value: number,
	onChange: (newValue: number) => void,
	steps: number[]
};

const NumberInput = (props: NumberInputProps) => {
	return (
		<div className={`${props.className ? props.className : ""}`}>
			<label className={styles.label}>{props.label}</label>
			<div className={styles.numberInput}>
				<div>
					{
						props.steps.map((step: number, index: number) => (
							<Button
								key={`numberinput-${props.label}-minus-${index}`}
								label={`-${props.steps[props.steps.length - 1 - index]}`}
								onClick={() => props.onChange(props.value - props.steps[props.steps.length - 1 - index])}
							/>
						))
					}
				</div>
				<TextInput
					className={styles.input}
					value={props.value.toString()}
					onChange={(_) => {}}
					disabled={true}
				/>
				<div>
					{
						props.steps.map((step: number, index: number) => (
							<Button
								key={`numberinput-${props.label}-plus-${index}`}
								label={`+${step}`}
								onClick={() => props.onChange(props.value + step)}
							/>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default NumberInput;