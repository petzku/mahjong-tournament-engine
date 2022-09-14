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
  return (
    <table className={styles.form}>
      <thead>
        <tr>
          <th colSpan={4}>Table {props.form.table} - Hanchan {props.form.round}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className={styles.cell}>{null}</th>
          <th className={styles.cell}>Raw</th>
          <th className={styles.cell}>Uma</th>
          <th className={styles.cell}>Penalty</th>
        </tr>
        <tr>
          <td className={styles.cell}>{props.form.eastPlayer}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
        </tr>
        <tr>
          <td className={styles.cell}>{props.form.southPlayer}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
        </tr>
        <tr>
          <td className={styles.cell}>{props.form.westPlayer}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
        </tr>
        <tr>
          <td className={styles.cell}>{props.form.northPlayer}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
          <td className={styles.cell}>{null}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default HanchanScoreForm;