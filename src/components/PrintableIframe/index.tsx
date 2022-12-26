import Button from "../Button";
import print from "./utils/print";
import styles from "./PrintableIframe.module.css";

type PrintableIframeProps = {
	label: string,
	subLabel?: string,
	id: string,
	src: string
};

const PrintableIframe = (props: PrintableIframeProps) => {
	return (
		<div>
			<Button
				label={props.label}
				subLabel={props.subLabel}
				onClick={() => print(props.id)}
			/>
			<iframe
				id={props.id}
				className={styles.iframe}
				src={props.src}
			/>
		</div>
	);
};

export default PrintableIframe;