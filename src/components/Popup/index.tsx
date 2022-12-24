import styles from "./Popup.module.css";

type PopupProps = {
	title: string,
	children: React.ReactNode,
	cancelText: string,
	confirmText: string,
	onCancel: () => void,
	onConfirm: () => void
	cancelHidden?: boolean,
	confirmHidden?: boolean,
	confirmDisabled?: boolean
}

const Popup = (props: PopupProps) => {
	return (
		<div className={styles.backdrop}>
			<div className={styles.popup}>
				<div className={styles.title}>
					{props.title}
				</div>
				<div className={styles.content}>
					{props.children}
				</div>
				<div className={styles.buttons}>
					{
						!props.cancelHidden &&
						<button onClick={() => props.onCancel()}>
							{props.cancelText}
						</button>
					}
					{
					!props.confirmHidden &&
					<button
						disabled={props.confirmDisabled}
						onClick={() => props.onConfirm()}>
						{props.confirmText}
					</button>
					}
				</div>
			</div>
		</div>
	);
}

export default Popup;