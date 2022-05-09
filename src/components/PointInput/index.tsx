import { formatPoints } from "../../utils/formatPoints";

export type PointInputType = {
  positive: boolean,
  value: number
};

export const getNumericValue = (value: PointInputType): number => {
  return value.value * (value.positive ? 1 : -1);
};

type PointInputProps = {
  className?: string,
  label: string,
  value: PointInputType,
  onChange: Function,
  tabIndex?: number
};

const ManualNumberInput = (props: PointInputProps) => {
  const onKeyDown = (e: any) => {
    switch (e.key)
    {
      case "+":
        props.onChange({positive: true, value: props.value.value});
        break;
      case "-":
        props.onChange({positive: false, value: props.value.value});
        break;
      case "Backspace":
        props.onChange({positive: props.value.positive, value: Math.floor(props.value.value/1000)*100})
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        props.onChange({positive: props.value.positive, value: props.value.value*10+(+e.key*100)})
        break;
    }
  };

  const sign: string = ((): string => {
    return props.value.positive ? "+" : "-";
  })();

  const displayValue = `${sign}${formatPoints(Math.abs(getNumericValue(props.value)))}`;

  return (
    <div className={`text-input ${props.className ? props.className : ""}`}>
      <label>{props.label}</label>
      <input
        type={"text"}
        value={displayValue}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={() => {}}
        tabIndex={props.tabIndex}
      />
    </div>
  );
};

export default ManualNumberInput;