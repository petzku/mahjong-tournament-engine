type TextInputProps = {
  className?: string,
  label: string,
  value: number,
  onChange: Function,
  steps: number[]
};

const TextInput = (props: TextInputProps) => {
  return (
    <div className={`text-input ${props.className ? props.className : ""}`}>
      <label>{props.label}</label>
      {
        props.steps.map((step: number, index: number) => (
          <button
            key={`numberinput-${props.label}-minus-${index}`}
            onClick={() => props.onChange(props.value - props.steps[props.steps.length - 1 - index])}>
            -{props.steps[props.steps.length - 1 - index]}
          </button>
        ))
      }
      <input
        type={"text"}
        value={props.value.toString()}
        readOnly={true}
      />
      {
        props.steps.map((step: number, index: number) => (
          <button
            key={`numberinput-${props.label}-plus-${index}`}
            onClick={() => props.onChange(props.value + step)}>
            +{step}
          </button>
        ))
      }
      {/* <button onClick={() => props.onChange(props.value + 1)}>+</button> */}
    </div>
  );
};

export default TextInput;