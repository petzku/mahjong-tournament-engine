import styles from "./PrintableIframe.module.css";

type PrintableIframeProps = {
	id: string,
	src: string
};

const PrintableIframe = (props: PrintableIframeProps) => {
	return (
		<iframe
			id={props.id}
			className={styles.iframe}
			src={props.src}
		/>
	);
};

export default PrintableIframe;