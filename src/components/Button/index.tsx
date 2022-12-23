import styles from "./Button.module.css";

type ButtonProps = {
	className?: string,
	label: string,
	subLabel?: string,
	onClick: () => void
};

const Button = (props: ButtonProps) => {
	return (
		<button
			className={`${styles.button} ${props.className ? props.className : ""}`}
			onClick={props.onClick}>
			<strong className={styles.mainLabel}>
				{props.label}
			</strong>
			{
				props.subLabel && props.subLabel.trim() !== "" &&
				<small className={styles.subLabel}>
					{props.subLabel}
				</small>
			}
		</button>
	);
}

export default Button;