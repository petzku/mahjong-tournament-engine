type NumberInputProps = {
  className?: string,
  label: string,
  value: number,
  onChange: (newValue: number) => void,
  steps: number[],
  disabled?: boolean
};

const NumberInput = (props: NumberInputProps) => {
  return (
    <div className={`text-input ${props.className ? props.className : ""} ${props.disabled ? "disabled" : ""}`}>
      <label>{props.label}</label>
      {
        props.steps.map((step: number, index: number) => (
          <button
            disabled={props.disabled}
            key={`numberinput-${props.label}-minus-${index}`}
            onClick={() => props.onChange(props.value - props.steps[props.steps.length - 1 - index])}>
            -{props.steps[props.steps.length - 1 - index]}
          </button>
        ))
      }
      <input
        disabled={props.disabled}
        type={"text"}
        value={props.value.toString()}
        readOnly={true}
      />
      {
        props.steps.map((step: number, index: number) => (
          <button
            disabled={props.disabled}
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

export default NumberInput;