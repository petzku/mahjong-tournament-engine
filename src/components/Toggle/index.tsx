import styles from "./Toggle.module.css";

type ToggleProps = {
  true: string,
  false: string,
  value: boolean,
  onSwitch: () => void
};

const Toggle = (props: ToggleProps) => {
  return (
    <div>
      <label
        className={`${styles.option} ${props.value ? styles.selected : ""}`}
        onClick={() => props.onSwitch()}>
        {props.true}
      </label>
      <label
        className={`${styles.option} ${!props.value ? styles.selected : ""}`}
        onClick={() => props.onSwitch()}>
        {props.false}
      </label>
    </div>
  );
};

export default Toggle;