import { PropsWithChildren } from "react";

import styles from "./CustomSelect.module.css";

interface ISelectProps extends PropsWithChildren {
	handler: (value: string) => void;
	options: string[] | { value: string; label: string }[];
	id?: string;
	additionalClass?: string;
	initialValue: string;
}

const CustomSelect = (props: ISelectProps) => {
	const { handler, options, id, additionalClass = "", initialValue } = props;
	const className = `${styles.CustomSelect} ${additionalClass}`;

	return (
		<select
			role="listbox"
			className={className}
			id={id}
			defaultValue={initialValue}
			onChange={(e) => handler(e.target.value)}
		>
			{options.map((item) => {
				if (typeof item === "object") {
					return (
						<option
							key={`value: ${item.value}, label: ${item.label}`}
							value={item?.value}
						>
							{item?.label}
						</option>
					);
				}
				return (
					<option key={`value: ${item}`} value={item}>
						{item}
					</option>
				);
			})}
		</select>
	);
};

export default CustomSelect;
