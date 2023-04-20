import { useSearchParams } from "react-router-dom";
import styles from "./HanchanScoreForm.module.css";

export type Form = {
	eastPlayer: string,
	southPlayer: string,
	westPlayer: string,
	northPlayer: string,
	table: number,
	round: number
};

type HanchanScoreFormProps = {
	form: Form
};

const HanchanScoreForm = (props: HanchanScoreFormProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const nameless = searchParams.get("nameless") === "true";
	
	return (
		<table className={styles.form}>
			<thead>
				<tr>
					<th colSpan={4}>Table {props.form.table} - Hanchan {props.form.round}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th className={`${styles.cell} ${styles.nameCell}`}>{null}</th>
					<th className={styles.cell}>Raw</th>
					<th className={styles.cell}>Uma</th>
					<th className={styles.cell}>Penalty</th>
				</tr>
				<tr>
					<td className={`${styles.cell} ${styles.nameCell}`}>東 {nameless ? "" : props.form.eastPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
				<tr>
					<td className={`${styles.cell} ${styles.nameCell}`}>南 {nameless ? "" : props.form.southPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
				<tr>
					<td className={`${styles.cell} ${styles.nameCell}`}>西 {nameless ? "" : props.form.westPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
				<tr>
					<td className={`${styles.cell} ${styles.nameCell}`}>北 {nameless ? "" : props.form.northPlayer}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
					<td className={styles.cell}>{null}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default HanchanScoreForm;