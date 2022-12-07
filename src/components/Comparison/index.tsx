import styles from "./Comparison.module.css";

type ComparisonProps = {
  change: number
};

const Comparison = (props: ComparisonProps) => {
  if (props.change < 0)
  {
    return <td><span className={styles.down}>▼</span> {Math.abs(props.change)}</td>;
  }
  
  if (props.change > 0)
  {
    return <td><span className={styles.up}>▲</span> {Math.abs(props.change)}</td>;
  }

  return <td><span className={styles.noChange}>-</span> {Math.abs(props.change)}</td>;
};

export default Comparison;