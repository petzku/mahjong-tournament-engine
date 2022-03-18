type TextInputProps = {
  className?: string,
  label: string,
  value: number,
  onChange: Function
};

const TextInput = (props: TextInputProps) => {
  return (
    <div className={`text-input ${props.className ? props.className : ""}`}>
      <label>{props.label}</label>
      <button onClick={() => props.onChange(props.value - 1)}>-</button>
      <input
        type={"text"}
        value={props.value.toString()}
        readOnly={true}
      />
      <button onClick={() => props.onChange(props.value + 1)}>+</button>
    </div>
  );
};

export default TextInput;