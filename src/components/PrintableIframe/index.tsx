import Button from "../Button";
import styles from "./PrintableIframe.module.css";

type PrintableIframeProps = {
	label: string,
	subLabel?: string,
	id: string,
	src: string
};

const PrintableIframe = (props: PrintableIframeProps) => {
	const print = (target: string) => {
		const iframe = document.getElementById(target) as HTMLIFrameElement;
		if (iframe !== null && "contentWindow" in iframe)
		{
			iframe?.contentWindow?.print();
		}
	};

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