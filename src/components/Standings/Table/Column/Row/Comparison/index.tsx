import styles from "./Comparison.module.css";

type ComparisonProps = {
	change: number
};

const Comparison = (props: ComparisonProps) => {
	const change = Math.abs(props.change);
	
	if (props.change < 0)
	{
		return <td><span className={styles.down}>▼</span> {change}</td>;
	}

	if (props.change > 0)
	{
		return <td><span className={styles.up}>▲</span> {change}</td>;
	}

	return <td>{null}</td>;
};

export default Comparison;