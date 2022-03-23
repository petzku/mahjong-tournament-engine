export type DropdownItem = {
  value: any,
  text: string
};

type DropdownProps = {
  className?: string,
  label: string,
  value: number,
  items: DropdownItem[],
  onChange: Function
};

const Dropdown = (props: DropdownProps) => {
  return (
    <div className={`${props.className ? props.className : ""}`}>
      <label>{props.label}</label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(+e.target.value)}>
        {
          props.items.map((item: DropdownItem, index: number) => (
          <option
            key={`dropdown-${props.label}-option-${index}`}
            value={item.value}>
            {item.text}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default Dropdown;