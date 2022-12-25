import { ChangeEvent, useRef } from "react";
import Button from "../Button";
import styles from "./FileUpload.module.css";

type FileUploadProps = {
	className?: string,
	label: string,
	subLabel?: string,
	onUpload: (files: FileList) => void
};

const FileUpload = (props: FileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const openFileSelection = () => {
		if (fileInputRef !== null && fileInputRef.current !== null)
		{
			fileInputRef.current.click();
		}
	};

	const fileInputOnChange = (e: ChangeEvent<HTMLInputElement>) =>
		passFile(e.target.files);

	const passFile = (files: FileList | null) => {
		if (files === null || files.length === 0)
		{
			return;
		}

		props.onUpload(files);
	};

	return (
		<div className={styles.fileUpload}>
			<Button
				className={props.className}
				label={props.label}
				subLabel={props.subLabel}
				onClick={() => openFileSelection()}
			/>
			<div className={styles.input}>
				<input
					ref={fileInputRef}
					type="file"
					onChange={fileInputOnChange}
				/>
			</div>
		</div>
	);
};

export default FileUpload;