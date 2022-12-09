import { ChangeEvent } from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  className?: string,
  label?: string,
  placeholder?: string,
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
        placeholder={props.placeholder ? props.placeholder : ""}
        className={styles.input}
        disabled={props.disabled}
        type={"text"}
        value={props.value}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;