import { ChangeEvent, useRef } from "react";
import Button from "../Button";
import styles from "./FileUpload.module.css";
import openFileSelection from "./utils/openFileSelection";
import fileInputOnChange from "./utils/fileInputOnChange";

type FileUploadProps = {
	className?: string,
	label: string,
	subLabel?: string,
	onUpload: (files: FileList | null) => void
};

const FileUpload = (props: FileUploadProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	return (
		<div className={styles.fileUpload}>
			<Button
				className={props.className}
				label={props.label}
				subLabel={props.subLabel}
				onClick={() => openFileSelection(fileInputRef)}
			/>
			<div className={styles.input}>
				<input
					ref={fileInputRef}
					type="file"
					onChange={(e: ChangeEvent<HTMLInputElement>) => props.onUpload(fileInputOnChange(e))}
				/>
			</div>
		</div>
	);
};

export default FileUpload;