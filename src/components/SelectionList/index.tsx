import styles from "./SelectionList.module.css";

export type SelectionListItem = {
	value: number,
	text: string
};

type SelectionListProps = {
	className?: string,
	id: string,
	label: string,
	value: number,
	items: SelectionListItem[],
	onChange: (newValue: number) => void
};

const SelectionList = (props: SelectionListProps) => {
	const className = `${props.className ? props.className : ""}`;

	return (
		<div className={className}>
			<label>{props.label}</label>
			<div className={styles.selectionListItems}>
				{
					props.items.map((item: SelectionListItem) => (
						<div
							key={`selection-list-${props.id}-${item.value}`}
							className={`${styles.selectionListItem} ${props.value === item.value ? styles.selected : ""}`}
							onClick={() => props.onChange(item.value)}>
							{item.text}
						</div>
					))
				}
			</div>
		</div>
	)
};

export default SelectionList;