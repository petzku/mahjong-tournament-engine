type ManualNumberInputProps = {
  className?: string,
  label: string,
  value: string,
  onChange: Function,
  tabIndex?: number
};

const ManualNumberInput = (props: ManualNumberInputProps) => {
  return (
    <div className={`text-input ${props.className ? props.className : ""}`}>
      <label>{props.label}</label>
      <input
        type={"text"}
        value={props.value}
        onChange={(e): void => props.onChange(e.target.value)}
        tabIndex={props.tabIndex}
      />
    </div>
  );
};

export default ManualNumberInput;