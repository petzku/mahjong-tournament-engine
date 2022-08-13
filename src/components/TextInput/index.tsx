import styles from "./TextInput.module.css";

type TextInputProps = {
  className?: string,
  label?: string,
  value: string,
  onChange: (newValue: string) => void,
  disabled?: boolean
};

const TextInput = (props: TextInputProps) => {
  return (
    <div className={`${props.className ? props.className : ""} ${props.disabled ? "disabled" : ""}`}>
      {
        props.label &&
        <label className={styles.label}>{props.label}</label>
      }
      <input
        className={styles.input}
        disabled={props.disabled}
        type={"text"}
        value={props.value}
        onChange={(e): void => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;