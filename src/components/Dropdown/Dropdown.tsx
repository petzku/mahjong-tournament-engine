export type DropdownItem = {
  value: any,
  text: string
};

type DropdownProps = {
  label: string,
  value: number,
  items: DropdownItem[],
  onChange: Function
};

const Dropdown = (props: DropdownProps) => {
  return (
    <div>
      <label>{props.label}</label>
      <select
        onChange={(e) => props.onChange(+e.target.value)}>
        {
          props.items.map((item: DropdownItem, index: number) => (
          <option
            key={`dropdown-${props.label}-option-${index}`}
            value={item.value}
            selected={props.value === index}
            onSelect={() => props.onChange(index)}>
            {item.text}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default Dropdown;