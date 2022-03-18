type TextInputProps = {
  className?: string,
  label: string,
  value: string,
  onChange: Function
};

const TextInput = (props: TextInputProps) => {
  return (
    <div className={`text-input ${props.className ? props.className : ""}`}>
      <label>{props.label}</label>
      <input
        type={"text"}
        value={props.value}
        onChange={(e): void => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;