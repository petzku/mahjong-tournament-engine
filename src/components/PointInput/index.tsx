import { formatPoints } from "../../utils/formatPoints";

import styles from "./PointInput.module.css";

export type PointInputType = {
  positive: boolean,
  value: number
};

export const getNumericValue = (value: PointInputType): number => {
  return value.value * (value.positive ? 1 : -1);
};

type PointInputProps = {
  value: PointInputType,
  onChange: Function,
  unflippable?: boolean,
  tabIndex?: number
  short: boolean
};

const PointInput = (props: PointInputProps) => {
  const onKeyDown = (e: any) => {
    switch (e.key)
    {
      case "+":
        if (props.unflippable)
        {
          break;
        }
        props.onChange({positive: true, value: props.value.value});
        break;
      case "-":
        if (props.unflippable)
        {
          break;
        }
        props.onChange({positive: false, value: props.value.value});
        break;
      case "Backspace":
        if (props.short)
        {
          props.onChange({positive: props.value.positive, value: Math.floor(props.value.value/1000)*100});
          break;
        }
        props.onChange({positive: props.value.positive, value: Math.floor(props.value.value/10)});
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
        if (props.short)
        {
          props.onChange({positive: props.value.positive, value: props.value.value*10+(+e.key*100)});
          break;
        }
        props.onChange({positive: props.value.positive, value: props.value.value*10+(+e.key)});
        break;
    }
  };

  const sign = props.value.positive ? "+" : "-";

  const displayValue =
    props.short
    ?
    `${sign}${formatPoints(Math.abs(getNumericValue(props.value)))}`
    :
    `${sign}${Math.abs(getNumericValue(props.value))}`;

  return (
    <div>
      <input
        className={styles.pointInput}
        type={"text"}
        value={displayValue}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={() => {}}
        tabIndex={props.tabIndex}
      />
    </div>
  );
};

export default PointInput;